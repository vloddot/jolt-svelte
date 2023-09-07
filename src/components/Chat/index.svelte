<script lang="ts">
	import MessageComponent from './Message.svelte';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { membersKey, repliesKey, usersKey, type Reply, messagesKey } from '.';
	import { _ } from 'svelte-i18n';
	import { getContext } from '$lib/context';
	import { settingsKey, sessionKey, clientKey } from '@routes/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import UserProfilePicture from '@components/UserProfilePicture.svelte';
	/**
	 * Which channel to show messages from.
	 */
	export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

	const session = getContext(sessionKey)!;
	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	let messages = writable<Message[]>([]);
	let members = writable<Member[]>([]);
	let users = writable<User[]>([]);

	const replies = writable<Reply[]>([]);

	setContext(messagesKey, messages);
	setContext(membersKey, members);
	setContext(usersKey, users);
	setContext(repliesKey, replies);

	let messageInputNode: HTMLTextAreaElement;
	let currentlyTypingUsers: User[] = [];

	$: {
		client.api
			.queryMessages(channel._id, { sort: 'Latest', include_users: true })
			.then((response) => {
				if (Array.isArray(response)) {
					messages.set(response.reverse());
				} else {
					messages.set(response.messages.reverse() ?? []);
					users.set(response.users);
					members.set(response.members ?? []);
				}
			});

		replies.set([]);
		currentlyTypingUsers = [];
	}

	async function listenToTypingEvents(receive: boolean) {
		if (!receive) {
			client.removeAllListeners('ChannelStartTyping');
			client.removeAllListeners('ChannelStopTyping');
			return;
		}

		client.on('ChannelStartTyping', async ({ id, user }) => {
			if (user == $session.user_id || id != channel._id) {
				return;
			}

			for (const { _id } of currentlyTypingUsers) {
				if (user == _id) {
					return;
				}
			}

			currentlyTypingUsers[currentlyTypingUsers.length] = await client.api.fetchUser(user);
		});

		client.on('ChannelStopTyping', ({ id, user }) => {
			if (id == channel._id) {
				currentlyTypingUsers = currentlyTypingUsers.filter((u) => u._id != user);
			}
		});
	}

	$: listenToTypingEvents($settings['jolt:receive-typing-indicators']);

	onMount(() => {
		client.on('Message', (message) => {
			if (message.channel == channel._id) {
				client.api.ackMessage(channel._id, message._id);
				messages.update((messages) => {
					messages.push(message as Message);
					return messages;
				});
			}
		});

		client.on('MessageDelete', ({ id, channel: channel_id }) => {
			if (channel_id != channel._id) {
				return;
			}

			messages.update((messages) => messages.filter((message) => message._id != id));
		});

		client.on('MessageUpdate', ({ id, channel: channel_id, data }) => {
			if (channel_id != channel._id) {
				return;
			}

			messages.update((messages) => {
				const index = messages.findIndex((message) => message._id == id);
				const message = messages[index];

				if (data.content != undefined) {
					message.content = data.content;
				}

				if (data.embeds != undefined) {
					message.embeds = data.embeds;
				}

				message.edited = data.edited;

				messages[index] = message;
				return messages;
			});
		});
	});

	async function sendMessage() {
		await client.api.sendMessage(channel._id, {
			content: messageInputNode.value.trim(),
			replies: $replies.map(({ message: { _id }, mention }) => ({
				id: _id,
				mention
			}))
		});

		replies.set([]);
		messageInputNode.value = '';
	}

	let channelName: string;

	async function updateChannelName(channel: Channel) {
		if (
			channel.channel_type == 'TextChannel' ||
			channel.channel_type == 'VoiceChannel' ||
			channel.channel_type == 'Group'
		) {
			channelName = `#${channel.name}`;
			return;
		}

		if (channel.channel_type == 'SavedMessages') {
			channelName = $_('channel.notes');
			return;
		}

		channelName = `@${getDisplayName(
			await client.api.fetchUser(
				channel.recipients[0] == $session.user_id ? channel.recipients[1] : channel.recipients[0]
			)
		)}`;
	}

	$: updateChannelName(channel);
</script>

<div class="main-content-container">
	<div class="flex flex-col h-full overflow-x-hidden overflow-y-scroll">
		<p>so um hi this is the start, i should make this text box much further down i think</p>
		{#each $messages as message}
			<MessageComponent {message} />
		{/each}
		{#each currentlyTypingUsers as user}
			{@const displayName = getDisplayName(user)}
			<div>
				<UserProfilePicture
					src={$settings['jolt:low-data-mode'] ? '/user.svg' : getDisplayAvatar(user)}
					width={16}
					height={16}
					name={displayName}
				/>
				{displayName}
				{$_('user.is-typing')}...
			</div>
		{/each}
		{#each $replies as reply}
			{@const user = client.api.fetchUser(reply.message.author)}

			<div class="flex">
				<p>
					{$_('message.replying-to')}

					<strong>
						{#await user then user}
							{@const displayName = getDisplayName(user)}
							<UserProfilePicture src={getDisplayAvatar(user)} name={displayName} />
							{displayName}
						{:catch}
							{@const displayName = `<${$_('user.unknown')}>`}
							<UserProfilePicture src="/user.svg" name={displayName} />
							{displayName}
						{/await}
					</strong>
				</p>

				<p class="pl-1 text-gray-600 overflow-ellipsis">{reply.message.content}</p>

				<div class="flex-1" />

				<div class="pr-2">
					<input id="mention" style="display: none;" type="checkbox" bind:checked={reply.mention} />
					<label class="cursor-pointer" for="mention">
						<img src="/at.svg" class="inline" alt="mention" />
						{reply.mention ? 'ON' : 'OFF'}
					</label>
				</div>

				<div class="pr-2">
					<button
						on:click={() =>
							replies.update((replies) => {
								replies = replies.filter((r) => r.message._id != reply.message._id);
								return replies;
							})}
					>
						<img src="/circle-x.svg" alt="Cancel mention" />
					</button>
				</div>
			</div>
		{/each}
		<form class="m-4" on:submit|preventDefault={sendMessage}>
			<div class="bg-gray-500 rounded-xl px-2 pt-2">
				<textarea
					on:input={() => {
						if ($settings['jolt:send-typing-indicators']) {
							client.websocket.send({
								type: 'BeginTyping',
								channel: channel._id
							});
						}
					}}
					on:keydown={(event) => {
						if (event.shiftKey || event.key != 'Enter') {
							return;
						}

						event.preventDefault();
						sendMessage();
					}}
					bind:this={messageInputNode}
					class="outline-none resize-none bg-inherit w-full"
					placeholder="{$_('send-message-in')} {channelName}"
				/>
			</div>
		</form>
	</div>
</div>
