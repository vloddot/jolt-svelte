<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import MessageReply from '@components/Chat/MessageReply.svelte';
	import { selectedServerIDKey } from '@routes/(app)/context';
	import { date, time } from 'svelte-i18n';
	import { decodeTime } from 'ulid';
	import { getUser, membersKey, messagesKey, repliesKey, usersKey } from '.';
	import UserIcon from '@components/Icons/UserIcon.svelte';
	import { clientKey, settingsKey } from '@routes/context';
	import TrashIcon from '@components/Icons/TrashIcon.svelte';
	import PencilSquareIcon from '@components/Icons/PencilSquareIcon.svelte';
	import ArrowUturnLeftIcon from '@components/Icons/ArrowUturnLeftIcon.svelte';
	import type { ComponentType } from 'svelte';
	import SystemMessageComponent from './SystemMessage.svelte';
	import AttachmentComponent from './Attachment.svelte';
	import EmbedComponent from './Embed.svelte';

	/**
	 * Message to show.
	 */
	export let message: Message;

	let messageContentToEdit: string | undefined = undefined;
	let author: User | undefined = undefined;
	let member: Member | undefined = undefined;

	let settings = getContext(settingsKey)!;
	let client = getContext(clientKey)!;
	let selectedServerID = getContext(selectedServerIDKey);

	let messages = getContext(messagesKey);
	let users = getContext(usersKey);
	let members = getContext(membersKey);
	let replies = getContext(repliesKey);

	interface MessageControls {
		src: ComponentType | string;
		alt: string;
		showIf?: (message: Message) => boolean;
		onclick: (message: Message) => unknown;
	}

	const controls: MessageControls[] = [
		{
			src: ArrowUturnLeftIcon,
			alt: 'Reply',
			onclick() {
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
			alt: 'Edit',
			showIf: (message) => message.author == client.user?._id,
			onclick: (message) =>
				(messageContentToEdit =
					messageContentToEdit == undefined ? message.content ?? '' : undefined)
		},
		{
			src: TrashIcon,
			alt: 'Delete',
			showIf: (message) => message.author == client.user?._id, // TODO: check permissions for message deleting
			onclick: (message) => client.api.deleteMessage(message.channel, message._id)
		}
	];

	async function updateMember(server_id: string, user_id: string) {
		member = $members?.find(
			(member) => member._id.server == server_id && member._id.user == user_id
		);
	}

	async function editMessage() {
		const editedMessage = await client.api.editMessage(message.channel, message._id, {
			content: messageContentToEdit
		});

		messages?.update((messages) => {
			messages[messages.findIndex((v) => v._id == message._id)] = editedMessage;
			return messages;
		});
	}

	$: getUser(client.api, $users ?? client.api.cache.users, message.author).then(
		(user) => (author = user)
	);
	$: $selectedServerID == undefined ? undefined : updateMember($selectedServerID, message.author);
	$: displayName = getDisplayName(author, member, message);
	$: timestamp = decodeTime(message._id);
</script>

<div id={message._id} class="container">
	{#if message.replies != undefined && message.replies.length != 0}
		<div class="reply-base">
			{#each message.replies as id}
				<MessageReply {id} />
			{/each}
		</div>
	{/if}

	<div class="user-detail">
		{#if !$settings['jolt:compact-mode']}
			{#if $settings['jolt:low-data-mode'] || author == undefined}
				<UserIcon />
			{:else}
				{@const displayAvatar = getDisplayAvatar(author, member, message)}
				{#if displayAvatar == undefined}
					<UserIcon />
				{:else}
					<img class="cover" alt={displayName} src={displayAvatar} width="40px" height="40px" />
				{/if}
			{/if}
		{/if}

		{displayName}

		<p class="timestamp">
			[{$date(timestamp)}
			{$time(timestamp)}]

			{#if message.edited != undefined}
				{@const timestamp = new Date(message.edited)}
				[edited
				{$date(timestamp)}
				{$time(timestamp)}]
			{/if}
		</p>

		<div class="flex-divider" />

		<div class="message-controls">
			{#each controls as { src, alt, onclick, showIf }}
				{#if showIf?.(message) ?? true}
					<button class="ml-2" aria-label={alt} on:click={() => onclick(message)}>
						{#if typeof src == 'string'}
							<img width="16px" height="16px" {src} {alt} />
						{:else}
							<svelte:component this={src} />
						{/if}
					</button>
				{/if}
			{/each}
		</div>
	</div>

	{#if messageContentToEdit != undefined}
		<form id="message-edit-form" class="bg-gray-500 rounded-xl px-2 pt-2" on:submit={editMessage}>
			<textarea
				on:keydown={(event) => {
					if (event.defaultPrevented) {
						return;
					}

					if (event.key == 'Escape') {
						event.preventDefault();
						messageContentToEdit = undefined;
						return;
					}

					if (event.shiftKey || event.key != 'Enter') {
						return;
					}

					event.preventDefault();
					editMessage();
					messageContentToEdit = undefined;
				}}
				class="outline-none resize-none bg-inherit w-full"
				placeholder="Edit this message"
				bind:value={messageContentToEdit}
			/>
		</form>
	{:else if message.content != undefined}
		<span style="overflow-wrap: break-word;" class="whitespace-pre-wrap">{message.content}</span>
	{/if}

	{#if message.system != undefined}
		<SystemMessageComponent system={message.system} />
	{/if}

	{#if message.attachments != undefined}
		{#each message.attachments as attachment}
			<AttachmentComponent {attachment} />
		{/each}
	{/if}

	{#if message.embeds != undefined}
		{#each message.embeds as embed}
			<EmbedComponent {embed} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		padding: 24px;

		&:hover {
			background-color: var(--hover);
		}

		.reply-base {
			display: flex;
		}

		.user-detail {
			display: flex;
			align-items: center;

			.timestamp {
				color: var(--tertiary-foreground);
			}

			.message-controls {
				display: hidden;
			}

			&:hover {
				.message-controls {
					display: flex;
				}
			}
		}
	}

	.flex-divider {
		flex: 1;
	}
</style>
