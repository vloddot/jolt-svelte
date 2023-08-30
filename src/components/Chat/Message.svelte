<script lang="ts">
	import { usersKey, membersKey, repliesKey, messagesKey } from '.';
	import { fetchUser, getDisplayAvatar, getDisplayName } from '$lib/util';
	import { getContext, selectedServerIDKey, sessionKey, settingsKey } from '$lib/context';
	import { _ } from 'svelte-i18n';
	import Embed from './Embed.svelte';
	import Attachment from './Attachment.svelte';
	import SystemMessage from './SystemMessage.svelte';
	import { invoke } from '@tauri-apps/api';

	/**
	 * Message to show.
	 */
	export let message: Message;

	let messageContentToEdit: string | undefined = undefined;
	let author: User | undefined = undefined;
	let member: Member | undefined = undefined;

	const session = getContext(sessionKey)!;
	const settings = getContext(settingsKey);
	const selectedServerID = getContext(selectedServerIDKey);

	const messages = getContext(messagesKey);
	const users = getContext(usersKey);
	const members = getContext(membersKey);
	const replies = getContext(repliesKey);

	interface MessageControls {
		src: string;
		alt: string;
		showIf?: () => boolean;
		onclick: (event: MouseEvent) => unknown;
	}

	const controls: MessageControls[] = [
		{
			src: '/reply.svg',
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
			src: '/note.svg',
			alt: $_('message.edit'),
			showIf: () => message.author == $session.user_id,
			onclick() {
				messageContentToEdit =
					messageContentToEdit == undefined ? message.content ?? '' : undefined;
			}
		},
		{
			src: '/trash.svg',
			alt: $_('message.delete'),
			showIf: () => message.author == $session.user_id, // TODO: check permissions for message deleting
			async onclick() {
				await invoke('delete_message', { channel_id: message.channel, message_id: message._id });
				messages?.update((messages) => {
					messages = messages.filter((v) => v._id != message._id);
					return messages;
				});
			}
		}
	];

	async function updateAuthor(id: string) {
		const user = $users?.find((user) => user._id == id);

		if (user == undefined) {
			author = await fetchUser(id);
			return;
		}

		author = user;
	}

	async function updateMember(server_id: string, user_id: string) {
		member = $members?.find(
			(member) => member._id.server == server_id && member._id.user == user_id
		);
	}

	async function editMessage() {
		const data_edit_message: DataEditMessage = {
			content: messageContentToEdit
		};

		const editedMessage = await invoke<Message>('edit_message', {
			channel_id: message.channel,
			message_id: message._id,
			data_edit_message
		});

		messages?.update((messages) => {
			messages[messages.findIndex((v) => v._id == message._id)] = editedMessage;
			return messages;
		});
	}

	$: updateAuthor(message.author);
	$: $selectedServerID == undefined ? undefined : updateMember($selectedServerID, message.author);
	$: displayName = getDisplayName(author, member, message);
	$: displayAvatar = getDisplayAvatar(author, member, message);
	// $: timestamp = dayjs(decodeTime(message._id)).toDate();
	// $: editedTimestamp =
	// 	message.edited == undefined ? undefined : dayjs(decodeTime(message.edited)).toDate();
</script>

<div class="hover:bg-gray-800 group p-4">
	<div class="flex">
		{#if !$settings?.lowDataMode}
			<img
				alt={displayName}
				src={displayAvatar}
				width="40"
				height="40"
				class="rounded-3xl inline aspect-square"
			/>
		{/if}

		{displayName}

		<!-- <p class="text-gray-500">
			[{$date(timestamp)}
			{$time(timestamp)}]

			{#if editedTimestamp != undefined}
				[{$_('message.edited')} {$date(editedTimestamp)} {$time(editedTimestamp)}]
			{/if}
		</p> -->

		<div class="flex-1" />

		<div class="hidden group-hover:block">
			{#each controls as { src, alt, onclick, showIf }}
				{#if showIf?.() ?? true}
					<button class="ml-2" aria-label={alt} on:click={onclick}>
						<img width="16" height="16" {src} {alt} />
					</button>
				{/if}
			{/each}
		</div>
	</div>

	{#if messageContentToEdit != undefined}
		<form on:submit={editMessage}>
			<textarea
				on:keydown={(event) => {
					if (event.shiftKey || event.key != 'Enter') {
						return;
					}

					event.preventDefault();
					editMessage();
					messageContentToEdit = undefined;
				}}
				class="bg-gray-500 rounded-xl px-2 pt-2"
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
