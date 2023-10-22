<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import { clientKey, settingsKey } from '@routes/context';
	import { onDestroy, onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { membersKey, messagesKey, repliesKey, usersKey, type SendableReply, channelKey } from '.';
	import MessageComponent from './Message.svelte';
	import XCircleIcon from '@components/Icons/XCircleIcon.svelte';
	import UserIcon from '@components/Icons/UserIcon.svelte';
	import SendMessageForm from './MessageForm.svelte';
	import SendableReplyComponent from './SendableReply.svelte';
	import PlusIcon from '@components/Icons/PlusIcon.svelte';
	import type { ServerMessage } from '$lib/client/WebSocketClient';

	/**
	 * Which channel to show messages from.
	 */
	export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

	let initialReplies: SendableReply[] = [];
	export { initialReplies as replies };

	export let messageInput = '';
	export let files: FileList | null = null;

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const messages = writable<Message[]>([]);
	const members = writable<Member[]>([]);
	const users = writable<User[]>([]);
	const replies = writable<SendableReply[]>(initialReplies);

	setContext(messagesKey, messages);
	setContext(membersKey, members);
	setContext(usersKey, users);
	setContext(repliesKey, replies);
	setContext(channelKey, channel);

	let messagesListNode: HTMLDivElement;
	let currentlyTypingUsers: User[] = [];
	let fileInputNode: HTMLInputElement;
	let channelName = 'Unknown Channel';
	let messageLoadPromise = Promise.resolve();

	$: {
		messageLoadPromise = client.api
			.queryMessages(channel._id, { sort: 'Latest', include_users: true })
			.then((response) => {
				if (Array.isArray(response)) {
					const value = response.reverse();
					messages.set(value);
				} else {
					const messagesValue = response.messages.reverse();
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
		let attachments: string[] = [];
		if (fileInputNode?.files != null) {
			attachments = await Promise.all(
				Array.from(fileInputNode.files).map((file) => client.autumn.uploadFile(file))
			);
			fileInputNode.value = '';
			files = null;
		}

		await client.api.sendMessage(channel._id, {
			content: messageInput.trim(),
			replies: $replies.map(({ message: { _id }, mention }) => ({
				id: _id,
				mention
			})),
			attachments
		});

		replies.set([]);
		messageInput = '';
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
			tick().then(() => {
				if (messagesListNode.lastElementChild?.scrollIntoView == undefined) {
					messagesListNode.scrollTo(0, messagesListNode.scrollHeight);
				} else {
					messagesListNode.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
				}
			});
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

	onMount(() => {
		client.on('Message', onMessage);
		client.on('MessageDelete', onMessageDelete);
		client.on('MessageUpdate', onMessageUpdate);
	});

	onDestroy(() => {
		client.removeListener('Message', onMessage);
		client.removeListener('MessageDelete', onMessageDelete);
		client.removeListener('MessageUpdate', onMessageUpdate);
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

			<button
				on:click={() => {
					if (fileInputNode != null) {
						fileInputNode.value = '';
						files = null;
					}
				}}
			>
				<XCircleIcon />
			</button>
		</div>
	{/if}
	{#each currentlyTypingUsers as user}
		{@const displayName = getDisplayName(user)}
		<div class="typing-indicator">
			{#if $settings['jolt:low-data-mode']}
				<UserIcon />
			{:else}
				<img
					class="cover"
					src={getDisplayAvatar(user)}
					width="16px"
					height="16px"
					alt={displayName}
				/>
			{/if}
			{displayName} is typing...
		</div>
	{/each}
	{#each $replies as reply}
		<SendableReplyComponent {reply} />
	{/each}
	<form class="message-form" id="send-message-form" on:submit={sendMessage}>
		<label for="file-upload">
			<PlusIcon />
		</label>
		<input type="file" id="file-upload" max="5" bind:files bind:this={fileInputNode} />
		<SendMessageForm
			sendTypingEvents={$settings['jolt:send-typing-indicators']}
			bind:value={messageInput}
			placeholder="Send message in {channelName}"
		/>
	</form>
</main>

<style lang="scss">
	main.main-content-container {
		display: flex;
		flex-direction: column;
	}

	input#file-upload {
		visibility: hidden;
		width: 0;
	}

	label[for='file-upload'] {
		cursor: pointer;
		margin-left: 16px;
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
		margin-bottom: 24px;
	}

	.typing-indicator {
		margin: 0px 16px;
		padding: 8px;
		background-color: var(--secondary-background);
		border-top-right-radius: var(--border-radius);
		border-top-left-radius: var(--border-radius);
	}
</style>
