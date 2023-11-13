<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayName } from '$lib/util';
	import { clientKey, settingsKey } from '@routes/context';
	import { onDestroy, onMount, setContext, tick } from 'svelte';
	import { get, writable } from 'svelte/store';
	import {
		membersKey,
		messagesKey,
		repliesKey,
		usersKey,
		type SendableReply,
		nearbyMessageKey,
		showEmojiMenuKey,
		messageInputKey,
		type UserSentMessage,
		userSentMessagesKey
	} from '.';
	import MessageComponent from './Message.svelte';
	import XCircleIcon from '@components/Icons/XCircleIcon.svelte';
	import FaceSmileIcon from '@components/Icons/FaceSmileIcon.svelte';
	import MessageForm from './MessageForm.svelte';
	import SendableReplyComponent from './SendableReply.svelte';
	import PlusIcon from '@components/Icons/PlusIcon.svelte';
	import type { ServerMessage } from '$lib/client/WebSocketClient';
	import { page } from '$app/stores';
	import EmojiMenu from './EmojiMenu.svelte';
	import { ulid } from 'ulid';
	import { selectedChannelKey } from '@routes/(app)/context';
	import ChatBubbleBottomCenterTextIcon from '@components/Icons/ChatBubbleBottomCenterTextIcon.svelte';

	let initialReplies: SendableReply[] = [];
	export { initialReplies as replies };

	let initialMessageInput = '';
	export { initialMessageInput as messageInput };

	let masqueradeName: string;
	let masqueradeAvatar: string;
	let showMasqueradeControls = false;

	const messageInput = writable(initialMessageInput);
	setContext(messageInputKey, messageInput);

	export let files: File[] = [];

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const channel = getContext(selectedChannelKey)!;
	const messages = writable(new Array<Message>());
	const members = writable(new Array<Member>());
	const users = writable(new Array<User>());
	const showEmojiMenu = writable(false);
	const replies = writable(initialReplies);
	const userSentMessages = writable(new Array<UserSentMessage>());

	setContext(messagesKey, messages);
	setContext(membersKey, members);
	setContext(usersKey, users);
	setContext(repliesKey, replies);
	setContext(showEmojiMenuKey, showEmojiMenu);
	setContext(userSentMessagesKey, userSentMessages);

	let messagesListNode: HTMLDivElement;
	let currentlyTypingUsers = new Array<User>();
	let channelName = 'Unknown Channel';
	let messageLoadPromise = Promise.resolve();

	$: {
		if ($channel == undefined) {
			messageLoadPromise = Promise.reject();
		} else {
			const nearby = getContext(nearbyMessageKey);
			messageLoadPromise = client
				.queryMessages($channel._id, {
					sort: 'Latest',
					include_users: true,
					limit: 100,
					nearby
				})
				.then((response) => {
					if (Array.isArray(response)) {
						let messagesValue: Message[];
						if (nearby == undefined) {
							messagesValue = response.reverse();
						} else {
							messagesValue = response.sort((a, b) => a._id.localeCompare(b._id));
						}
						messages.set(messagesValue);
					} else {
						let messagesValue: Message[];
						if (nearby == undefined) {
							messagesValue = response.messages.reverse();
						} else {
							messagesValue = response.messages.sort((a, b) => a._id.localeCompare(b._id));
						}
						messages.set(messagesValue);
						users.set(response.users);
						members.set(response.members ?? []);
					}
				});

			replies.set([]);
			currentlyTypingUsers = [];

			messageLoadPromise.then(() => {
				tick().then(() => messagesListNode.scrollTo(0, messagesListNode.scrollHeight));
			});
		}
	}

	async function channelStartTypingHandler({
		id,
		user
	}: Extract<ServerMessage, { type: 'ChannelStartTyping' }>): Promise<void> {
		if (user == client.user?._id || id != $channel?._id) {
			return;
		}

		for (const { _id } of currentlyTypingUsers) {
			if (user == _id) {
				return;
			}
		}

		currentlyTypingUsers[currentlyTypingUsers.length] = await client.fetchUser(user);
	}

	function channelStopTypingHandler({
		id,
		user
	}: Extract<ServerMessage, { type: 'ChannelStopTyping' }>): void {
		if (id == $channel?._id) {
			currentlyTypingUsers = currentlyTypingUsers.filter((u) => u._id != user);
		}
	}

	$: {
		// reference so this code reruns :shrug:
		channel;

		client.removeListener('ChannelStartTyping', channelStartTypingHandler);
		client.removeListener('ChannelStopTyping', channelStopTypingHandler);

		if ($settings['jolt:receive-typing-indicators']) {
			client.on('ChannelStartTyping', channelStartTypingHandler);
			client.on('ChannelStopTyping', channelStopTypingHandler);
		}
	}

	async function sendMessage() {
		const content = get(messageInput).trim();
		messageInput.set('');

		userSentMessages.update((messages) => {
			if ($channel == undefined) {
				return messages;
			}

			const channelValue = $channel;
			messages.push({
				// definitely not the actual ID of the message,
				// just used to get the approximate timestamp of the message
				_id: ulid(),
				content,
				replies: get(replies).map(({ message: { _id } }) => _id),
				channel: $channel?._id,
				author: client.user!._id,
				promise: new Promise((resolve, reject) => {
					Promise.all(files.map((file) => client.autumn.uploadFile(file)))
						.then((attachments) => {
							files = [];
							client
								.sendMessage(channelValue._id, {
									content,
									replies: get(replies).map(({ message: { _id }, mention }) => ({
										id: _id,
										mention
									})),
									masquerade: {
										name: masqueradeName,
										avatar: masqueradeAvatar
									},
									attachments
								})
								.then((message) => {
									replies.set([]);
									resolve(message);
								})
								.catch(reject);
						})
						.catch(reject);
				})
			});

			return messages;
		});
	}

	function onMessage(message: Message) {
		if (message.channel != $channel?._id) {
			return;
		}

		const scrolledToBottom =
			messagesListNode.offsetHeight + messagesListNode.scrollTop >
			messagesListNode.scrollHeight - 20;

		if (document.hasFocus() && scrolledToBottom) {
			client.ackMessage($channel._id, message._id);
		}

		messages.update((messages) => {
			messages.push(message);
			return messages;
		});

		if (scrolledToBottom) {
			tick().then(() => messagesListNode.scrollTo(0, messagesListNode.scrollHeight));
		}
	}

	function onMessageDelete({
		id,
		channel: channel_id
	}: Extract<ServerMessage, { type: 'MessageDelete' }>) {
		if (channel_id != $channel?._id) {
			return;
		}

		messages.update((messages) => messages.filter((message) => message._id != id));
	}

	function onMessageUpdate({
		id,
		channel: channel_id,
		data
	}: Extract<ServerMessage, { type: 'MessageUpdate' }>) {
		if (channel_id != $channel?._id) {
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
	}

	function handlePaste(event: ClipboardEvent) {
		if (event.clipboardData?.files != null && event.clipboardData.files.length != 0) {
			event.preventDefault();
			const clipboardFiles = Array.from(event.clipboardData.files);
			files = files?.concat(clipboardFiles) ?? clipboardFiles;
		}
	}

	function pushFile() {
		const input = document.createElement('input');
		input.type = 'file';
		input.onchange = (e) => {
			const event = e as InputEvent & { target: { files?: FileList } };

			if (event.target.files == undefined) {
				return;
			}

			files = files.concat(Array.from(event.target.files));
		};

		input.click(); // click :3
	}

	onMount(() => {
		client.on('Message', onMessage);
		client.on('MessageDelete', onMessageDelete);
		client.on('MessageUpdate', onMessageUpdate);
		document.addEventListener('paste', handlePaste);
	});

	onDestroy(() => {
		client.removeListener('Message', onMessage);
		client.removeListener('MessageDelete', onMessageDelete);
		client.removeListener('MessageUpdate', onMessageUpdate);
		document.removeEventListener('paste', handlePaste);
	});

	async function updateChannelName(channel: Channel | undefined) {
		if (channel == undefined) {
			channelName = '<Unknown Channel>';
			return;
		}

		if (channel.channel_type != 'SavedMessages' && channel.channel_type != 'DirectMessage') {
			channelName = `#${channel.name}`;
			return;
		}

		if (channel.channel_type == 'SavedMessages') {
			channelName = 'Saved Notes';
			return;
		}

		try {
			channelName = `@${getDisplayName(
				await client.fetchUser(
					channel.recipients[0] == client.user?._id ? channel.recipients[1] : channel.recipients[0]
				)
			)}`;
		} catch (error) {
			channelName = 'Unknown Channel';
		}
	}

	$: updateChannelName($channel);

	function getTypingUsersDisplay(currentlyTypingUsers: User[]): string {
		if (currentlyTypingUsers.length == 0) {
			return '';
		}

		const users = currentlyTypingUsers.map((user) => getDisplayName(user));
		if (users.length == 1) {
			return `${users[0]} is typing...`;
		}

		if (users.length >= 5) {
			return 'Several users are typing...';
		}

		return `${users.slice(0, users.length - 1).join(', ')} and ${
			users[users.length - 1]
		} are typing...`;
	}

	$: {
		const messageElement = document.getElementById(`MESSAGE-${$page.url.hash.slice(1)}`);

		messageElement?.animate(
			[
				{
					backgroundColor: 'var(--mention)'
				},
				{
					backgroundColor: 'var(--mention)',
					offset: 0.6
				},
				{
					backgroundColor: 'transparent'
				}
			],
			{
				duration: 3000,
				iterations: 1
			}
		);
	}
</script>

<main class="main-content-container">
	<div bind:this={messagesListNode} class="messages-list">
		{#await messageLoadPromise}
			<!-- TODO: make it look better lol -->
			Loading...
		{:then}
			{#each $messages as message, messageIndex}
				<MessageComponent {message} {messageIndex} />
			{/each}
			{#each $userSentMessages as message, messageIndex}
				<MessageComponent {message} {messageIndex} />
			{/each}
		{/await}
	</div>

	{#if files != null && files.length != 0}
		<div class="flex-container">
			<p>
				Uploading
				{Array.from(files)
					.map((file) => file.name)
					.join(', ')}
			</p>

			<div class="flex-divider" />

			<button on:click={() => (files = [])}>
				<XCircleIcon />
			</button>
		</div>
	{/if}

	{#if $showEmojiMenu}
		<div class="emoji-menu">
			<EmojiMenu />
		</div>
	{/if}

	<div class="message-form-box">
		{#each $replies as reply}
			<SendableReplyComponent {reply} />
		{/each}
		<form class="message-form" id="send-message-form" on:submit={sendMessage}>
			<button on:click={pushFile} class="default-button">
				<PlusIcon />
			</button>
			<MessageForm
				sendTypingEvents={$settings['jolt:send-typing-indicators']}
				bind:value={$messageInput}
				placeholder="Send message in {channelName}"
			/>
			<div class="flex-divider" />

			{#if showMasqueradeControls}
				<input style="border-radius: 0;margin-right: 2px" placeholder="Masquerade Name" bind:value={masqueradeName} />
				<input style="border-radius: 0;" placeholder="Masquerade Avatar" bind:value={masqueradeAvatar} />
			{/if}

			<button class="default-button" on:click={() => (showMasqueradeControls = !showMasqueradeControls)}>
				<ChatBubbleBottomCenterTextIcon />
			</button>

			<button type="button" on:click={() => showEmojiMenu.update((v) => !v)} class="default-button">
				<FaceSmileIcon />
			</button>
		</form>
		<span class="typing-indicator">{getTypingUsersDisplay(currentlyTypingUsers)}</span>
	</div>
</main>

<style lang="scss">
	main.main-content-container {
		display: flex;
		flex-direction: column;
	}

	:global(.message-form-box) {
		display: flex;
		flex-direction: column;
		margin: 0px 16px;
		position: relative;
	}

	.typing-indicator {
		display: flex;
		position: absolute;
		left: 16px;
		bottom: 1px;
		height: 24px;
		align-items: center;
	}

	:global(.message-form) {
		display: flex;
		background-color: var(--message-box);
		border-radius: var(--border-radius);
		align-items: center;
		border-bottom: 2px solid var(--accent);
		margin-bottom: 24px;
	}

	.messages-list {
		display: flex;
		flex-direction: column;
		justify-items: end;
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
		margin-bottom: 16px;
	}

	.emoji-menu {
		position: relative;
	}
</style>
