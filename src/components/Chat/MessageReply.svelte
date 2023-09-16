<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import UserProfilePicture from '@components/UserProfilePicture.svelte';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { clientKey, settingsKey } from '@routes/context';
	import { getUser, messagesKey, usersKey } from '.';

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
		? `channels/${$selectedChannelID}#${id}`
		: `servers/${$selectedServerID}/channels/${$selectedChannelID}#${id}`}"
>
	{#if $selectedChannelID != undefined}
		{#await $messages?.find(({ _id }) => id == _id) ?? client.api.fetchMessage($selectedChannelID, id) then message}
			{#if !$settings['jolt:low-data-mode']}
				{#await getUser(client.api, $users ?? [], message.author)}
					&lt;Unknown User&gt;
				{:then author}
					{@const displayName = getDisplayName(author)}
					<UserProfilePicture
						src={getDisplayAvatar(author)}
						name={displayName}
						width={24}
						height={24}
					/>
					{displayName}
				{/await}:
			{/if}
			{#if message.content != undefined}
				<span class="text-gray-600">{message.content}</span>
			{/if}
		{/await}
	{/if}
</a>
