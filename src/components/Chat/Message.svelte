<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import MessageReply from '@components/Chat/MessageReply.svelte';
	import { decodeTime } from 'ulid';
	import {
		getUser,
		membersKey,
		messagesKey,
		repliesKey,
		usersKey,
		type UserSentMessage,
		userSentMessagesKey
	} from '.';
	import GenericUserCircleIcon from '@components/Icons/GenericUserCircleIcon.svelte';
	import { clientKey, settingsKey } from '@routes/context';
	import TrashIcon from '@components/Icons/TrashIcon.svelte';
	import PencilSquareIcon from '@components/Icons/PencilSquareIcon.svelte';
	import ArrowUturnLeftIcon from '@components/Icons/ArrowUturnLeftIcon.svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import SystemMessageComponent from './SystemMessage.svelte';
	import AttachmentComponent from './Attachment.svelte';
	import EmbedComponent from './Embed.svelte';
	import tippy from 'svelte-tippy';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/animations/shift-away.css';
	import MessageForm from './MessageForm.svelte';
	import { get } from 'svelte/store';
	import dayjs from 'dayjs';
	import calendar from 'dayjs/plugin/calendar';
	import { selectedServerKey } from '@routes/(app)/context';

	dayjs.extend(calendar);

	/**
	 * Message to show.
	 */
	export let message: Message | UserSentMessage;
	export let messageIndex: number;

	let messageContentToEdit: string | undefined = undefined;
	let author: User | undefined = undefined;
	let member: Member | undefined = undefined;

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;
	const selectedServer = getContext(selectedServerKey);

	const messages = getContext(messagesKey);
	const userSentMessages = getContext(userSentMessagesKey);
	const users = getContext(usersKey);
	const members = getContext(membersKey);
	const replies = getContext(repliesKey);

	$: if ('promise' in message) {
		const list = document.querySelector('.messages-list');
		if (list != null) {
			list.scrollTo(0, list.scrollHeight);
		}

		message.promise.then(() => {
			userSentMessages?.update((messages) => messages.filter((v) => v._id != message._id));
		});
	}

	interface MessageControls {
		src: ComponentType<SvelteComponent<{ width?: string; height?: string }>> | string;
		name: string;
		showIf?: (message: Message) => boolean;
		onclick: (message: Message) => unknown;
	}

	const controls: MessageControls[] = [
		{
			src: ArrowUturnLeftIcon,
			name: 'Reply',
			onclick(message) {
				if (($replies?.length ?? 0) >= 5) {
					return;
				}

				if ($replies?.some((reply) => reply.message._id == message._id)) {
					return;
				}

				replies?.update((replies) => {
					replies.push({ message, mention: true });
					return replies;
				});
			}
		},
		{
			src: PencilSquareIcon,
			name: 'Edit',
			showIf: (message) => message.author == client.user?._id,
			onclick: (message) =>
				(messageContentToEdit =
					messageContentToEdit == undefined ? message.content ?? '' : undefined)
		},
		{
			src: TrashIcon,
			name: 'Delete',
			showIf: (message) => message.author == client.user?._id, // TODO: check permissions for message deleting
			onclick: (message) => client.deleteMessage(message.channel, message._id)
		}
	];

	async function updateMember(server_id: string, user_id: string) {
		member = $members?.find(
			(member) => member._id.server == server_id && member._id.user == user_id
		);
	}

	async function editMessage() {
		const editedMessage = await client.editMessage(message.channel, message._id, {
			content: messageContentToEdit
		});

		messages?.update((messages) => {
			messages[messages.findIndex((v) => v._id == message._id)] = editedMessage;
			return messages;
		});

		messageContentToEdit = undefined;
	}

	function isHead(message: Message | UserSentMessage): boolean {
		if (messages == undefined) {
			return true;
		}

		const messagesValue = get(messages);

		const lastMessage = messagesValue[messageIndex - 1];

		if (lastMessage == undefined) {
			return true;
		}

		return (
			message.author != lastMessage.author ||
			('masquerade' in message
				? message.masquerade?.name != lastMessage.masquerade?.name ||
				  message.masquerade?.avatar != lastMessage.masquerade?.avatar ||
				  message.masquerade?.colour != lastMessage.masquerade?.colour
				: false) ||
			decodeTime(message._id) - decodeTime(lastMessage._id) >= 7 * 60 * 1000 ||
			(message.replies?.length ?? 0) != 0
		);
	}

	$: getUser($users ?? client.cache.users, message.author, (id) => client.fetchUser(id)).then(
		(user) => (author = user)
	);

	$: if ($selectedServer != undefined) {
		updateMember($selectedServer?._id, message.author);
	}

	$: displayName =
		author == undefined
			? 'Unknown User'
			: getDisplayName(author, member, 'masquerade' in message ? message : undefined);
	$: timestamp = decodeTime(message._id);
</script>

<div id="MESSAGE-{message._id}" class="message-container">
	{#if !('promise' in message)}
		<div class="message-controls">
			{#each controls as { name, onclick, src, showIf }}
				{#if showIf?.(message) ?? true}
					<button
						on:click={() => onclick(message)}
						use:tippy={{
							placement: 'top',
							content: name,
							theme: 'top-tooltip',
							animation: 'shift-away',
							duration: 100
						}}
					>
						{#if typeof src == 'string'}
							<img {src} alt={name} width="18px" height="18px" />
						{:else}
							<svelte:component this={src} width="18px" height="18px" />
						{/if}
					</button>
				{/if}
			{/each}
		</div>
	{/if}

	{#if message.replies != undefined && message.replies.length != 0}
		<div class="replies">
			{#each message.replies as id}
				<MessageReply {id} />
			{/each}
		</div>
	{/if}

	{#if isHead(message) && !('system' in message)}
		<div class="user-detail">
			{#if $settings['jolt:low-data-mode'] || author == undefined}
				<GenericUserCircleIcon />
			{:else}
				{@const displayAvatar = getDisplayAvatar(author, member, message)}
				{#if displayAvatar == undefined}
					<GenericUserCircleIcon />
				{:else}
					<img class="cover" alt={displayName} src={displayAvatar} width="40px" height="40px" />
				{/if}
			{/if}

			{displayName}

			<p class="timestamp">
				{dayjs(timestamp).calendar()}

				{#if 'edited' in message && message.edited != undefined}
					{@const timestamp = new Date(message.edited)}
					<span
						class="timestamp"
						use:tippy={{
							placement: 'top',
							content: dayjs(timestamp).calendar(),
							theme: 'top-tooltip',
							animation: 'shift-away',
							duration: 100
						}}
					>
						(edited)
					</span>
				{/if}
			</p>
		</div>
	{/if}

	{#if messageContentToEdit != undefined}
		<form id="message-edit-form" class="message-form" on:submit={editMessage}>
			<MessageForm
				bind:value={messageContentToEdit}
				on:keydown={(event) => {
					if (event.detail.key == 'Escape') {
						messageContentToEdit = undefined;
					}
				}}
				placeholder="Edit this message"
				sendTypingEvents={false}
			/>
		</form>
	{:else if message.content != undefined}
		<span class:message-not-sent={'promise' in message} class="message-content">
			{message.content}</span
		>
	{/if}

	{#if 'system' in message && message.system != undefined}
		<SystemMessageComponent system={message.system} />
	{/if}

	{#if 'attachments' in message && message.attachments != undefined}
		{#each message.attachments as attachment}
			<AttachmentComponent {attachment} />
		{/each}
	{/if}

	{#if 'embeds' in message && message.embeds != undefined}
		{#each message.embeds as embed}
			<EmbedComponent {embed} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.message-container {
		display: flex;
		flex-direction: column;
		padding: 4px 24px;
		position: relative;

		.message-form {
			:global(textarea) {
				padding-left: 14px;
			}
		}

		.message-controls {
			display: none;
			position: absolute;
			right: 1%;
			top: -18px;
			border-radius: var(--border-radius);
			background-color: var(--secondary-background);

			button {
				width: 32px;
				height: 32px;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0px;
				border: none;
				outline: none;
				border-radius: 0;
				background-color: transparent;
			}
		}

		&:hover {
			background-color: var(--hover);
			.message-controls {
				display: flex;
			}
		}

		.replies {
			display: flex;
			flex-direction: column;
		}

		.user-detail {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-bottom: 2px;

			.timestamp {
				color: var(--tertiary-foreground);
				font-size: 12px;
			}
		}

		.message-content {
			white-space: pre-wrap;
			overflow-wrap: break-word;
		}

		.message-not-sent {
			color: var(--tertiary-foreground);
		}
	}
</style>
