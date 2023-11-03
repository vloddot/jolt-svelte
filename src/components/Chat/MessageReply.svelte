<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { clientKey, settingsKey } from '@routes/context';
	import { getUser, messagesKey, usersKey } from '.';
	import GenericUserCircleIcon from '@components/Icons/GenericUserCircleIcon.svelte';

	const client = getContext(clientKey)!;
	const settings = getContext(settingsKey)!;
	const selectedServerID = getContext(selectedServerIDKey);
	const selectedChannelID = getContext(selectedChannelIDKey);
	const messages = getContext(messagesKey);
	const users = getContext(usersKey);

	export let id: string;
</script>

<a
	href="{base}/{$selectedServerID == undefined
		? `channels/${$selectedChannelID}/${id}`
		: `servers/${$selectedServerID}/channels/${$selectedChannelID}/${id}`}"
>
	{#if $selectedChannelID != undefined}
		{#await $messages?.find(({ _id }) => id == _id) ?? client.api.fetchMessage($selectedChannelID, id) then message}
			{#if !$settings['jolt:low-data-mode']}
				{#await getUser(client.api, $users ?? client.api.cache.users, message.author)}
					&lt;Unknown User&gt;
				{:then author}
					{#if author != undefined}
						{@const displayName = getDisplayName(author)}
						<img
							class="cover"
							src={getDisplayAvatar(author)}
							alt={displayName}
							width="24px"
							height="24px"
						/>
						{displayName}
					{:else}
						<GenericUserCircleIcon />

						Unknown User
					{/if}
				{/await}
			{/if}
			{#if message.content != undefined}
				<span class="message-content">{message.content}</span>
			{/if}
		{/await}
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
