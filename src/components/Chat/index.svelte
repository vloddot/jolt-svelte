<script lang="ts">
	import { event, invoke } from '@tauri-apps/api';
	import MessageComponent from './Message.svelte';
	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { membersKey, repliesKey, usersKey, type Reply } from '.';
	import { getAutumnURL, getDefaultUserAvatar } from '$lib/util';
	import { _ } from 'svelte-i18n';
	import { getChannelName } from '$lib/util';
	import UserFetcher from '@components/UserFetcher.svelte';
	import { redirect } from '@sveltejs/kit';
	import { getContext, sessionContext } from '$lib/context';

	/**
	 * Which channel to show messages from.
	 */
	export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

	const session = getContext(sessionContext);

	if ($session === undefined) {
		throw redirect(302, '/login');
	}

	let messages: Message[] = [];
	let members: Writable<Member[]> = writable([]);
	let users: Writable<User[]> = writable([]);

	const replies = writable<Reply[]>([]);

	setContext(membersKey, members);
	setContext(usersKey, users);
	setContext(repliesKey, replies);

	let messageInputNode: HTMLTextAreaElement;
	let currentlyTypingUsers: User[] = [];

	$: {
		invoke<BulkMessagePayload>('fetch_messages', { channel_id: channel._id }).then((response) => {
			if (Array.isArray(response)) {
				messages = response;
			} else {
				messages = response.messages ?? [];
				members.set(response.members ?? []);
				users.set(response.users ?? []);
			}
		});

		replies.set([]);
		currentlyTypingUsers = [];
	}

	onMount(() => {
		event.listen<Message>('message', ({ payload: message }) => {
			if (message.channel === channel._id) {
				messages = [message, ...messages];
			}
		});

		event.listen<ChannelTypingPayload>(
			'channel_start_typing',
			async ({ payload: { user_id, channel_id } }) => {
				if (
					user_id === $session?.user_id ||
					channel_id !== channel._id ||
					currentlyTypingUsers.map((user) => user._id).includes(user_id)
				) {
					return;
				}

				currentlyTypingUsers = [
					...currentlyTypingUsers,
					await invoke<User>('fetch_user', { user_id })
				];
			}
		);

		event.listen<ChannelTypingPayload>(
			'channel_stop_typing',
			({ payload: { user_id, channel_id } }) => {
				if (channel_id === channel._id) {
					currentlyTypingUsers = currentlyTypingUsers.filter((user) => user._id !== user_id);
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
		{#each [...messages].reverse() as message}
			<div class="hover:bg-gray-800">
				<MessageComponent {message} />
			</div>
		{/each}
		{#each currentlyTypingUsers as user}
			<div>
				<img
					src={user.avatar === undefined
						? getDefaultUserAvatar(user._id)
						: getAutumnURL(user.avatar)}
					class="inline aspect-square rounded-3xl"
					width="16"
					height="16"
					alt={user.username}
				/>
				{user.username}
				{$_('user.is-typing')}...
			</div>
		{/each}
		{#if $replies.length !== 0}
			{$_('message.replying-to')}
		{/if}
		{#each $replies as reply}
			<div>
				<UserFetcher ids={[reply.message.author]} let:users>
					{#if users !== undefined}
						<strong>{users[0].username}</strong>
					{/if}
					<strong slot="catch">&lt;{$_('user.unknown')}&gt;</strong>
				</UserFetcher>
				<p>{reply.message.content?.slice(0, 50)}</p>
			</div>
		{/each}
		<form class="m-4" on:submit|preventDefault={sendMessage}>
			{#await getChannelName(channel, $session?.user_id) then name}
				<div class="bg-gray-500 rounded-xl px-2 pt-2">
					<textarea
						on:input={() => invoke('start_typing', { channel_id: channel._id })}
						on:keydown={(event) => {
							if (event.shiftKey || event.key !== 'Enter') {
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
