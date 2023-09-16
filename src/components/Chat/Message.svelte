<script lang="ts">
	import { usersKey, membersKey, repliesKey, messagesKey, getUser } from '.';
	import { getContext } from '$lib/context';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { clientKey, sessionKey } from '@routes/context';
	import { settingsKey } from '@routes/context';
	import { _, date, time } from 'svelte-i18n';
	import Embed from './Embed.svelte';
	import Attachment from './Attachment.svelte';
	import SystemMessage from './SystemMessage.svelte';
	import { decodeTime } from 'ulid';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import UserProfilePicture from '@components/UserProfilePicture.svelte';
	import MessageReply from '@components/Chat/MessageReply.svelte';
	import { base } from '$app/paths';

	/**
	 * Message to show.
	 */
	export let message: Message;

	let messageContentToEdit: string | undefined = undefined;
	let author: User | undefined = undefined;
	let member: Member | undefined = undefined;

	const session = getContext(sessionKey)!;
	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;
	const selectedServerID = getContext(selectedServerIDKey);
	const selectedChannelID = getContext(selectedChannelIDKey)!;

	const messages = getContext(messagesKey);
	const users = getContext(usersKey);
	const members = getContext(membersKey);
	const replies = getContext(repliesKey);

	interface MessageControls {
		src: string;
		alt: string;
		showIf?: (message: Message) => boolean;
		onclick: (message: Message) => unknown;
	}

	const controls: MessageControls[] = [
		{
			src: `${base}reply.svg`,
			alt: $_('message.reply'),
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
			src: `${base}note.svg`,
			alt: $_('message.edit'),
			showIf: (message) => message.author == client.user?._id,
			onclick: (message) =>
				(messageContentToEdit =
					messageContentToEdit == undefined ? message.content ?? '' : undefined)
		},
		{
			src: `${base}trash.svg`,
			alt: $_('message.delete'),
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

	$: getUser(client.api, $users ?? [], message.author).then((user) => (author = user));
	$: $selectedServerID == undefined ? undefined : updateMember($selectedServerID, message.author);
	$: displayName = getDisplayName(author, member, message);
	$: displayAvatar = $settings['jolt:low-data-mode']
		? `${base}/user.svg`
		: getDisplayAvatar(author, member, message);
	$: timestamp = decodeTime(message._id);
</script>

<div id={message._id} class="flex flex-col hover:bg-gray-800 group p-4">
	{#if message.replies != undefined && message.replies.length != 0}
		<div class="flex flex-col">
			{#each message.replies as id}
				<MessageReply {id} />
			{/each}
		</div>
	{/if}

	<div class="flex">
		{#if !$settings['jolt:compact-mode']}
			<UserProfilePicture name={displayName} src={displayAvatar} width={40} height={40} />
		{/if}

		{displayName}

		<p class="text-gray-500">
			[{$date(timestamp)}
			{$time(timestamp)}]

			{#if message.edited != undefined}
				{@const timestamp = new Date(message.edited)}
				[{$_('message.edited')}
				{$date(timestamp)}
				{$time(timestamp)}]
			{/if}
		</p>

		<div class="flex-1" />

		<div class="hidden group-hover:flex">
			{#each controls as { src, alt, onclick, showIf }}
				{#if showIf?.(message) ?? true}
					<button class="ml-2" aria-label={alt} on:click={() => onclick(message)}>
						<img width="16" height="16" {src} {alt} />
					</button>
				{/if}
			{/each}
		</div>
	</div>

	{#if messageContentToEdit != undefined}
		<form class="bg-gray-500 rounded-xl px-2 pt-2" on:submit={editMessage}>
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
		<SystemMessage system={message.system} />
	{/if}

	{#if message.attachments != undefined}
		{#each message.attachments as attachment}
			<Attachment {attachment} />
		{/each}
	{/if}

	{#if message.embeds != undefined}
		{#each message.embeds as embed}
			<Embed {embed} />
		{/each}
	{/if}
</div>
