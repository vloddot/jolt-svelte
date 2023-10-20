<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import MessageReply from '@components/Chat/MessageReply.svelte';
	import { selectedServerIDKey } from '@routes/(app)/context';
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
	import tippy from 'svelte-tippy';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/animations/shift-away-subtle.css';
	import MessageForm from './MessageForm.svelte';
	import { get } from 'svelte/store';
	import dayjs from 'dayjs';
	import calendar from 'dayjs/plugin/calendar';

	dayjs.extend(calendar);

	/**
	 * Message to show.
	 */
	export let message: Message;

	export let messageIndex: number;

	let messageContentToEdit: string | undefined = undefined;
	let author: User | undefined = undefined;
	let member: Member | undefined = undefined;

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;
	const selectedServerID = getContext(selectedServerIDKey);

	const messages = getContext(messagesKey);
	const users = getContext(usersKey);
	const members = getContext(membersKey);
	const replies = getContext(repliesKey);

	interface MessageControls {
		src: ComponentType | string;
		name: string;
		showIf?: (message: Message) => boolean;
		onclick: (message: Message) => unknown;
	}

	const controls: MessageControls[] = [
		{
			src: ArrowUturnLeftIcon,
			name: 'Reply',
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

		messageContentToEdit = undefined;
	}

	function isHead(message: Message): boolean {
		if (messages == undefined) {
			return true;
		}

		const messagesValue = get(messages);

		const lastMessage = messagesValue.at(messageIndex - 1);

		return (
			message.author != lastMessage?.author ||
			message.masquerade != lastMessage?.masquerade ||
			decodeTime(message._id) - decodeTime(lastMessage?._id ?? '0'.repeat(26)) >= 7 * 60 * 1000 ||
			(message.replies?.length ?? 0) != 0
		);
	}

	$: getUser(client.api, $users ?? client.api.cache.users, message.author).then(
		(user) => (author = user)
	);
	$: $selectedServerID == undefined ? undefined : updateMember($selectedServerID, message.author);
	$: displayName = author == undefined ? 'Unknown User' : getDisplayName(author, member, message);
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

	{#if isHead(message)}
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
				{dayjs(timestamp).calendar()}

				{#if message.edited != undefined}
					{@const timestamp = new Date(message.edited)}
					<span
						class="timestamp"
						use:tippy={{
							placement: 'top',
							content: dayjs(timestamp).calendar(),
							theme: 'top-tooltip',
							animation: 'shift-away-subtle',
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
		<form
			style="padding-left: 8px"
			id="message-edit-form"
			class="message-form"
			on:submit={editMessage}
		>
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
		padding: 8px 24px;

		&:hover {
			background-color: var(--hover);
		}

		.reply-base {
			display: flex;
		}

		.user-detail {
			display: flex;
			align-items: center;
			gap: 8px;

			.timestamp {
				color: var(--tertiary-foreground);
				font-size: 12px;
			}
		}
	}
</style>
