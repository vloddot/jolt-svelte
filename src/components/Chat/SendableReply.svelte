<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import { repliesKey, type SendableReply } from '.';

	import { getDisplayName, getDisplayAvatar } from '$lib/util';
	import GenericUserCircleIcon from '@components/Icons/GenericUserCircleIcon.svelte';
	import AtSymbolIcon from '@components/Icons/AtSymbolIcon.svelte';
	import XCircleIcon from '@components/Icons/XCircleIcon.svelte';
	export let reply: SendableReply;

	const client = getContext(clientKey)!;
	const replies = getContext(repliesKey)!;
</script>

<div class="container">
	Replying to
	{#await client.api.fetchUser(reply.message.author) then user}
		{@const displayName = getDisplayName(user)}
		<img class="cover" src={getDisplayAvatar(user)} alt={displayName} />
		{displayName}
	{:catch}
		<GenericUserCircleIcon />
		&lt;UnknownUser&gt;
	{/await}

	{#if reply.message.content}
		<p class="message-content">{reply.message.content}</p>
	{/if}

	<div class="flex-divider" />

	<label class="reply-button" aria-label="Mention author {reply.mention ? 'ON' : 'OFF'}">
		<input id="mention" style="display: none;" type="checkbox" bind:checked={reply.mention} />
		<AtSymbolIcon width="15" height="15" />
		{reply.mention ? 'ON' : 'OFF'}
	</label>

	<button
		class="reply-button default-button"
		on:click={() =>
			replies.update((replies) => {
				replies = replies.filter((r) => r.message._id != reply.message._id);
				return replies;
			})}
	>
		<XCircleIcon />
	</button>
</div>

<style lang="scss">
	img.cover {
		max-width: 24px;
		max-height: 24px;
	}

	.container {
		display: flex;
		align-items: center;
		background-color: var(--secondary-background);
		max-height: 24px;
		padding: 4px;
		padding-left: 24px;
		gap: 8px;
		border-top-right-radius: var(--border-radius);
		border-top-left-radius: var(--border-radius);
		font-size: 0.8em;
	}

	.message-content {
		color: var(--tertiary-foreground);
		text-overflow: ellipsis;
	}

	img {
		width: 16px;
		height: 16px;
	}

	.reply-button {
		cursor: pointer;
		color: var(--tertiary-foreground);
		transition: color 150ms;

		&:hover {
			color: var(--foreground);
		}
	}
</style>
