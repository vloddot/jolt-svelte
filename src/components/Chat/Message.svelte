<script lang="ts">
	import { usersKey, membersKey, repliesKey } from '.';
	import { getDisplayAvatar } from '$lib/util';
	import {
		getContext,
		selectedServerIDContext,
		sessionContext,
		settingsContext
	} from '$lib/context';
	import dayjs from 'dayjs';
	import { decodeTime } from 'ulid';
	import { _, time, date } from 'svelte-i18n';
	import Embed from './Embed.svelte';
	import Attachment from './Attachment.svelte';
	import SystemMessage from './SystemMessage.svelte';
	import { redirect } from '@sveltejs/kit';

	/**
	 * Message to show.
	 */
	export let message: Message;

	const session = getContext(sessionContext);
	const settings = getContext(settingsContext);
	const selectedServerID = getContext(selectedServerIDContext);

	if ($session === undefined) {
		throw redirect(302, '/login');
	}

	const users = getContext(usersKey);
	const members = getContext(membersKey);
	const replies = getContext(repliesKey);

	interface MessageControls {
		src: string;
		alt: string;
		showIf?: () => boolean;
		onclick: (event: MouseEvent) => unknown;
	}

	function pushReply() {
		if ($replies?.some((reply) => reply.message._id === message._id)) {
			return;
		}

		replies?.update((replies) => {
			replies.push({ message, mention: true });
			return replies;
		});
	}

	const controls: MessageControls[] = [
		{
			src: '/reply.svg',
			alt: $_('message.reply'),
			onclick: pushReply
		},
		{
			src: '/note.svg',
			alt: $_('message.edit'),
			onclick() {
				// TODO
			},
			showIf: () => message.author === $session?.user_id
		}
	];

	$: author = $users !== undefined ? $users.find((user) => user._id === message.author) : undefined;

	$: member =
		$members !== undefined
			? $members.find(
					(member) => member._id.server === $selectedServerID && member._id.user === author?._id
			  )
			: undefined;

	$: displayUsername =
		message.system === undefined
			? member?.nickname ?? author?.username ?? `<${$_('user.unknown')}>`
			: $_('message.system');

	$: displayAvatar =
		message.system === undefined ? getDisplayAvatar(member, author) : '/user-gear.svg';

	$: messageTimestamp = dayjs(decodeTime(message._id)).toDate();
	$: messageEditedAt = message.edited === undefined ? undefined : dayjs(message.edited).toDate();
</script>

<div class="group m-4">
	<div class="flex">
		{#if !$settings?.lowDataMode}
			<img
				alt={displayUsername}
				src={displayAvatar}
				width="40"
				height="40"
				class="rounded-3xl inline aspect-square"
			/>
		{/if}

		{displayUsername}

		<p class="text-gray-500">
			[{$date(messageTimestamp)}
			{$time(messageTimestamp)}]

			{#if messageEditedAt !== undefined}
				[{$_('message.edited')} {$date(messageEditedAt)} {$time(messageEditedAt)}]
			{/if}
		</p>

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

	{#if message.content !== undefined}
		<span style="overflow-wrap: break-word;" class="whitespace-pre-wrap">{message.content}</span>
	{/if}

	{#if message.system !== undefined}
		<SystemMessage system={message.system} />
	{/if}
	{#if message.attachments}
		{#each message.attachments as attachment}
			<Attachment {attachment} />
		{/each}
	{/if}

	{#if message.embeds}
		{#each message.embeds as embed}
			<Embed {embed} />
		{/each}
	{/if}
</div>
