<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import { clientKey, settingsKey } from '@routes/context';
	import { onDestroy, onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import {
		membersKey,
		messagesKey,
		repliesKey,
		usersKey,
		type SendableReply,
		channelKey,
		nearbyMessageKey,
		showEmojiMenuKey,

		messageInputKey

	} from '.';
	import MessageComponent from './Message.svelte';
	import XCircleIcon from '@components/Icons/XCircleIcon.svelte';
	import FaceSmileIcon from '@components/Icons/FaceSmileIcon.svelte';
	import GenericUserCircleIcon from '@components/Icons/GenericUserCircleIcon.svelte';
	import SendMessageForm from './MessageForm.svelte';
	import SendableReplyComponent from './SendableReply.svelte';
	import PlusIcon from '@components/Icons/PlusIcon.svelte';
	import type { ServerMessage } from '$lib/client/WebSocketClient';
	import { page } from '$app/stores';
	import EmojiMenu from './EmojiMenu.svelte';

	/**
	 * Which channel to show messages from.
	 */
	export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

	let initialReplies: SendableReply[] = [];
	export { initialReplies as replies };

	let initialMessageInput = '';
	export { initialMessageInput as messageInput };

	const messageInput = writable(initialMessageInput);
	setContext(messageInputKey, messageInput);

	export let files: File[] = [];

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const messages = writable(new Array<Message>());
	const members = writable(new Array<Member>());
	const users = writable(new Array<User>());
	const showEmojiMenu = writable(false);
	const replies = writable(initialReplies);

	setContext(messagesKey, messages);
	setContext(membersKey, members);
	setContext(usersKey, users);
	setContext(repliesKey, replies);
	setContext(showEmojiMenuKey, showEmojiMenu);
	setContext(channelKey, channel);

	let messagesListNode: HTMLDivElement;
	let currentlyTypingUsers: User[] = [];
	let channelName = 'Unknown Channel';
	let messageLoadPromise = Promise.resolve();

	$: {
		const nearby = getContext(nearbyMessageKey);
		messageLoadPromise = client.api
			.queryMessages(channel._id, {
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

	async function sendMessage() {
		const attachments = await Promise.all(files.map((file) => client.autumn.uploadFile(file)));

		files = [];

		await client.api.sendMessage(channel._id, {
			content: $messageInput.trim(),
			replies: $replies.map(({ message: { _id }, mention }) => ({
				id: _id,
				mention
			})),
			attachments
		});

		replies.set([]);
		messageInput.set('');
	}

	function onMessage(message: Message) {
		if (message.channel != channel._id) {
			return;
		}

		const scrolledToBottom =
			messagesListNode.offsetHeight + messagesListNode.scrollTop >
			messagesListNode.scrollHeight - 20;

		if (document.hasFocus() && scrolledToBottom) {
			client.api.ackMessage(channel._id, message._id);
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
		if (channel_id != channel._id) {
			return;
		}

		messages.update((messages) => messages.filter((message) => message._id != id));
	}

	function onMessageUpdate({
		id,
		channel: channel_id,
		data
	}: Extract<ServerMessage, { type: 'MessageUpdate' }>) {
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

		input.click();
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

	async function updateChannelName(channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>) {
		if (channel.channel_type == 'TextChannel' || channel.channel_type == 'Group') {
			channelName = `#${channel.name}`;
			return;
		}

		if (channel.channel_type == 'SavedMessages') {
			channelName = 'Saved Notes';
			return;
		}

		try {
			channelName = `@${getDisplayName(
				await client.api.fetchUser(
					channel.recipients[0] == client.user?._id ? channel.recipients[1] : channel.recipients[0]
				)
			)}`;
		} catch (error) {
			channelName = 'Unknown Channel';
		}
	}

	$: updateChannelName(channel);

	function getTypingUsersDisplay(currentlyTypingUsers: User[]): string {
		if (currentlyTypingUsers.length == 0) {
			throw new Error('function called with an array of length 0');
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
	{#each $replies as reply}
		<SendableReplyComponent {reply} />
	{/each}
	<div class="typing-indicator" class:transparent-color={currentlyTypingUsers.length == 0}>
		{#each currentlyTypingUsers as user}
			{#if $settings['jolt:low-data-mode']}
				<GenericUserCircleIcon />
			{:else}
				<img
					class="cover"
					src={getDisplayAvatar(user)}
					width="16px"
					height="16px"
					alt={getDisplayName(user)}
				/>
			{/if}
		{/each}

		{#if currentlyTypingUsers.length != 0}
			{getTypingUsersDisplay(currentlyTypingUsers)}
		{/if}
	</div>

	{#if $showEmojiMenu}
		<div class="emoji-menu">
			<EmojiMenu />
		</div>
	{/if}

	<form class="message-form" id="send-message-form" on:submit={sendMessage}>
		<button on:click={pushFile} class="default-button">
			<PlusIcon />
		</button>
		<SendMessageForm
			sendTypingEvents={$settings['jolt:send-typing-indicators']}
			bind:value={$messageInput}
			placeholder="Send message in {channelName}"
		/>
		<div class="flex-divider" />
		<button type="button" on:click={() => showEmojiMenu.update(v => !v)} class="default-button">
			<FaceSmileIcon />
		</button>
	</form>
</main>

<style lang="scss">
	main.main-content-container {
		display: flex;
		flex-direction: column;
	}

	:global(.message-form) {
		display: flex;
		background-color: var(--message-box);
		border-radius: var(--border-radius);
		align-items: center;
		margin: 0px 16px 16px 16px;
		border-bottom: 2px solid var(--accent);
	}

	.messages-list {
		display: flex;
		flex-direction: column;
		justify-items: end;
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.emoji-menu {
		position: relative;
	}

	.typing-indicator {
		display: flex;
		gap: 4px;
		padding-left: 8px;
		align-items: center;
		margin: 0px 16px;
		height: 36px;
		background-color: var(--secondary-background);
		border-top-right-radius: var(--border-radius);
		border-top-left-radius: var(--border-radius);
	}

	.transparent-color {
		background-color: transparent;
	}
</style>
