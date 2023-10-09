<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import { clientKey, settingsKey } from '@routes/context';
	import { beforeUpdate, onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { membersKey, messagesKey, repliesKey, usersKey, type SendableReply, channelKey } from '.';
	import MessageComponent from './Message.svelte';
	import XCircleIcon from '@components/Icons/XCircleIcon.svelte';
	import UserIcon from '@components/Icons/UserIcon.svelte';
	import SendMessageForm from './SendMessageForm.svelte';
	import SendableReplyComponent from './SendableReply.svelte';

	/**
	 * Which channel to show messages from.
	 */
	export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const messages = writable<Message[]>([]);
	const members = writable<Member[]>([]);
	const users = writable<User[]>([]);

	const replies = writable<SendableReply[]>([]);

	setContext(messagesKey, messages);
	setContext(membersKey, members);
	setContext(usersKey, users);
	setContext(repliesKey, replies);
	setContext(channelKey, channel);

	let messagesListNode: HTMLDivElement;
	let currentlyTypingUsers: User[] = [];
	let fileUploadNode: HTMLInputElement | null;
	let files: FileList | null;

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

	beforeUpdate(() => {
		if (!messagesListNode) {
			return;
		}

		// autoscroll when new messages are added
		if (
			messagesListNode.offsetHeight + messagesListNode.scrollTop >
			messagesListNode.scrollHeight - 20
		) {
			tick().then(() => {
				messagesListNode.scrollTo(0, messagesListNode.scrollHeight);
			});
		}
	});

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
</script>

<main class="main-content-container">
	<div bind:this={messagesListNode} class="messages-list">
		{#each $messages as message}
			<MessageComponent {message} />
		{/each}
	</div>
	{#if files != null && files.length != 0}
		<div class="flex">
			<p>
				Uploading
				{Array.from(files)
					.map((file) => file.name)
					.join(', ')}
			</p>

			<div class="flex-1" />

			<button
				class="pr-2"
				on:click={() => {
					if (fileUploadNode != null) {
						fileUploadNode.value = '';
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
	<SendMessageForm />
</main>

<style lang="scss">
	main.main-content-container {
		display: flex;
		flex-direction: column;
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
	}
</style>
