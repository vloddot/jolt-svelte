<script lang="ts">
	import { event, invoke } from '@tauri-apps/api';
	import MessageComponent from './Message.svelte';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { membersKey, repliesKey, usersKey, type Reply, messagesKey } from '.';
	import { fetchUser, getDisplayAvatar } from '$lib/util';
	import { _ } from 'svelte-i18n';
	import { getChannelName } from '$lib/util';
	import { getContext, sessionKey } from '$lib/context';

	/**
	 * Which channel to show messages from.
	 */
	export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

	const session = getContext(sessionKey)!;

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
		invoke<BulkMessagePayload>('fetch_messages', { channel_id: channel._id }).then((response) => {
			if (Array.isArray(response)) {
				messages.set(response.reverse());
			} else {
				messages.set(response.messages?.reverse() ?? []);
				members.set(response.members ?? []);
				users.set(response.users ?? []);
			}
		});

		replies.set([]);
		currentlyTypingUsers = [];
	}

	onMount(() => {
		event.listen<Message>('message', ({ payload: message }) => {
			if (message.channel == channel._id) {
				messages.update((messages) => {
					messages.push(message);
					return messages;
				});
			}
		});

		event.listen<ChannelTypingPayload>(
			'channel_start_typing',
			async ({ payload: { user_id, channel_id } }) => {
				if (
					user_id == $session.user_id ||
					channel_id != channel._id ||
					currentlyTypingUsers.map((user) => user._id).includes(user_id)
				) {
					return;
				}

				currentlyTypingUsers[currentlyTypingUsers.length] = await fetchUser(user_id);
			}
		);

		event.listen<ChannelTypingPayload>(
			'channel_stop_typing',
			({ payload: { user_id, channel_id } }) => {
				if (channel_id == channel._id) {
					currentlyTypingUsers = currentlyTypingUsers.filter((user) => user._id != user_id);
				}
			}
		);
	});

	async function sendMessage() {
		const data_message_send: DataMessageSend = {
			content: messageInputNode.value.trim(),
			replies: $replies.map(({ message: { _id }, mention }) => ({
				id: _id,
				mention
			}))
		};

		replies.set([]);
		messageInputNode.value = '';

		await invoke<Message>('send_message', { channel_id: channel._id, data_message_send });
	}
</script>

<div class="main-content-container">
	<div class="flex flex-col h-full overflow-x-hidden overflow-y-scroll">
		<p>so um hi this is the start, i should make this text box much further down i think</p>
		{#each $messages as message}
			<div class="hover:bg-gray-800">
				<MessageComponent {message} />
			</div>
		{/each}
		{#each currentlyTypingUsers as user}
			<div>
				<img
					src={getDisplayAvatar(user)}
					class="inline aspect-square rounded-3xl"
					width="16"
					height="16"
					alt={user.username}
				/>
				{user.username}
				{$_('user.is-typing')}...
			</div>
		{/each}
		{#if $replies.length != 0}
			{$_('message.replying-to')}
		{/if}
		{#each $replies as reply}
			{@const user = fetchUser(reply.message.author)}
			<div>
				<strong>
					{#await user then user}
						{user.username}
					{:catch}
						&lt;{$_('user.unknown')}&gt;
					{/await}
				</strong>
				<p class="overflow-ellipsis">{reply.message.content}</p>
			</div>
		{/each}
		<form class="m-4" on:submit|preventDefault={sendMessage}>
			{#await getChannelName(channel, $session.user_id) then name}
				<div class="bg-gray-500 rounded-xl px-2 pt-2">
					<textarea
						on:input={() => invoke('start_typing', { channel_id: channel._id })}
						on:keydown={(event) => {
							if (event.shiftKey || event.key != 'Enter') {
								return;
							}

							event.preventDefault();
							sendMessage();
						}}
						bind:this={messageInputNode}
						class="outline-none resize-none bg-inherit w-full"
						placeholder="{$_('send-message-in')} {name}"
					/>
				</div>
			{/await}
		</form>
	</div>
</div>
