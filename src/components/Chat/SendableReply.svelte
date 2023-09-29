<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import { repliesKey, type SendableReply } from '.';

	import RoundedImage from '@components/RoundedImage.svelte';
	import { getDisplayName, getDisplayAvatar } from '$lib/util';
	import User from '$lib/icons/user.svg';
	import AtSymbol from '$lib/icons/at-symbol.svg';
	import XCircle from '$lib/icons/x-circle.svg';

	export let reply: SendableReply;

	const client = getContext(clientKey)!;
	const replies = getContext(repliesKey)!;
</script>

<div class="flex">
	<p>
		replying to
		<strong>
			{#await client.api.fetchUser(reply.message.author) then user}
				{@const displayName = getDisplayName(user)}
				<RoundedImage src={getDisplayAvatar(user)} name={displayName} />
				{displayName}
			{:catch}
				{@const displayName = '<Unknown User>'}
				<RoundedImage src={User} name={displayName} />
				{displayName}
			{/await}
		</strong>
	</p>

	<p class="pl-1 text-gray-600 overflow-ellipsis">{reply.message.content}</p>

	<div class="flex-1" />

	<div class="pr-2">
		<input id="mention" style="display: none;" type="checkbox" bind:checked={reply.mention} />
		<label class="cursor-pointer" for="mention">
			<img src={AtSymbol} class="inline" alt="mention" />
			{reply.mention ? 'ON' : 'OFF'}
		</label>
	</div>

	<div class="pr-2">
		<button
			on:click={() =>
				replies.update((replies) => {
					replies = replies.filter((r) => r.message._id != reply.message._id);
					return replies;
				})}
		>
			<img src={XCircle} alt="Cancel mention" />
		</button>
	</div>
</div>
