<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import UserProfilePicture from '@components/UserProfilePicture.svelte';
	import { clientKey, settingsKey } from '@routes/context';
	import { onMount, setContext, tick } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import { membersKey, messagesKey, repliesKey, usersKey, type Reply } from '.';
	import MessageComponent from './Message.svelte';

	/**
	 * Which channel to show messages from.
	 */
	export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

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
	let messagesList: HTMLDivElement;
	let currentlyTypingUsers: User[] = [];

	$: {
		client.api
			.queryMessages(channel._id, { sort: 'Latest', include_users: true })
			.then((response) => {
				if (Array.isArray(response)) {
					messages.set(response.reverse());
				} else {
					messages.set(response.messages.reverse());
					users.set(response.users);
					members.set(response.members ?? []);
				}
			});

		replies.set([]);
		currentlyTypingUsers = [];
	}

	$: {
		if (messagesList) {
			// reference `messages` so that this code re-runs whenever it changes
			$messages;

			// autoscroll when new messages are added
			if (messagesList.offsetHeight + messagesList.scrollTop > messagesList.scrollHeight - 20) {
				tick().then(() => {
					messagesList.scrollTo(0, messagesList.scrollHeight);
				});
			}
		}
	}

	async function listenToTypingEvents(receive: boolean) {
		if (!receive) {
			client.removeAllListeners('ChannelStartTyping');
			client.removeAllListeners('ChannelStopTyping');
			return;
		}

		client.on('ChannelStartTyping', async ({ id, user }) => {
			if (user == client.user?._id || id != channel._id) {
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
			if (message.channel != channel._id) {
				return;
			}

			client.api.ackMessage(channel._id, message._id);
			messages.update((messages) => {
				messages.push(message);
				return messages;
			});
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
				channel.recipients[0] == client.user?._id ? channel.recipients[1] : channel.recipients[0]
			)
		)}`;
	}

	function endTyping() {
		if ($settings['jolt:send-typing-indicators']) {
			client.websocket.send({ type: 'EndTyping', channel: channel._id });
		}
	}

	function startTyping() {
		if ($settings['jolt:send-typing-indicators']) {
			if (messageInputNode.value == '') {
				client.websocket.send({ type: 'EndTyping', channel: channel._id });
				return;
			}

			client.websocket.send({ type: 'BeginTyping', channel: channel._id });
		}
	}

	$: updateChannelName(channel);
</script>

<main class="main-content-container flex flex-col">
	<div bind:this={messagesList} class="flex flex-col h-full overflow-x-hidden overflow-y-scroll">
		<p>so um hi this is the start, i should make this text box much further down i think</p>
		{#each $messages as message}
			<MessageComponent {message} />
		{/each}
	</div>
	{#each currentlyTypingUsers as user}
		{@const displayName = getDisplayName(user)}
		<div>
			<UserProfilePicture
				src={$settings['jolt:low-data-mode'] ? `${base}/user.svg` : getDisplayAvatar(user)}
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
						<UserProfilePicture src="{base}/user.svg" name={displayName} />
						{displayName}
					{/await}
				</strong>
			</p>

			<p class="pl-1 text-gray-600 overflow-ellipsis">{reply.message.content}</p>

			<div class="flex-1" />

			<div class="pr-2">
				<input id="mention" style="display: none;" type="checkbox" bind:checked={reply.mention} />
				<label class="cursor-pointer" for="mention">
					<img src="{base}/at.svg" class="inline" alt="mention" />
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
					<img src="{base}/circle-x.svg" alt="Cancel mention" />
				</button>
			</div>
		</div>
	{/each}
	<form on:submit={sendMessage} class="bg-gray-500 rounded-xl px-2 pt-2 m-4">
		<textarea
			on:blur={endTyping}
			on:input={startTyping}
			on:keydown={(event) => {
				if (event.shiftKey || event.key != 'Enter') {
					return;
				}

				event.preventDefault();

				sendMessage();
			}}
			bind:this={messageInputNode}
			maxlength="2000"
			class="outline-none resize-none bg-inherit w-full h-12"
			placeholder="{$_('send-message-in')} {channelName}"
		/>
	</form>
</main>
