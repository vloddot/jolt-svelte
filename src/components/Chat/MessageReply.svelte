<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import { clientKey, settingsKey } from '@routes/context';
	import { getUser, membersKey, messagesKey, usersKey } from '.';
	import GenericUserCircleIcon from '@components/Icons/GenericUserCircleIcon.svelte';
	import { selectedChannelKey, selectedServerKey } from '@routes/(app)/context';

	const client = getContext(clientKey)!;
	const settings = getContext(settingsKey)!;
	const channel = getContext(selectedChannelKey)!;
	const server = getContext(selectedServerKey);
	const messages = getContext(messagesKey);
	const users = getContext(usersKey);
	const members = getContext(membersKey);

	export let id: string;
</script>

<a
	href="{base}/{$server == undefined
		? `channels/${$channel?._id}/${id}`
		: `servers/${$server?._id}/channels/${$channel?._id}/${id}`}"
>
	{#if $channel != undefined}
		{@const message = $messages?.find(({ _id: mid }) => id == mid)}
		{#if message == undefined}
			Could not resolve message.
		{:else}
			{#if !$settings['jolt:low-data-mode']}
				{#await getUser($users ?? client.cache.users, message.author, (id) => client.fetchUser(id))}
					<GenericUserCircleIcon />

					&lt;Unknown User&gt;
				{:then author}
					{#if author != undefined}
						{@const member = $members?.find((member) => member._id.user == author._id)}
						{@const displayName = getDisplayName(author, member, message)}
						<img
							class="cover"
							src={getDisplayAvatar(author, member, message)}
							alt={displayName}
							width="24px"
							height="24px"
						/>
						{displayName}
					{:else}
						<GenericUserCircleIcon />

						&lt;Unknown User&gt;
					{/if}
				{/await}
			{/if}
			{#if message.content != undefined}
				<span class="message-content">{message.content}</span>
			{/if}
		{/if}
	{/if}
</a>

<style lang="scss">
	a {
		color: inherit;
		.message-content {
			color: var(--secondary-foreground);
		}
	}
</style>
