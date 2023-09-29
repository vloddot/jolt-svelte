<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import RoundedImage from '@components/RoundedImage.svelte';
	import { clientKey } from '@routes/context';

	const client = getContext(clientKey)!;
	export let system: SystemMessage;
</script>

{#if system.type == 'text'}
	{system.content}
{:else if system.type == 'channel_description_changed' || system.type == 'channel_icon_changed' || system.type == 'channel_renamed' || system.type == 'user_added' || system.type == 'user_remove'}
	{#await client.api.fetchUser(system.by) then user}
		{@const displayName = getDisplayName(user)}
		<RoundedImage src={getDisplayAvatar(user)} width={24} height={24} name={displayName} />
		{displayName}
		{#if system.type == 'channel_description_changed'}
			changed this channel's description.
		{:else if system.type == 'channel_icon_changed'}
			changes this channel icon.
		{:else if system.type == 'channel_renamed'}
			renamed this channel to {system.name}.
		{:else if system.type == 'user_added' || system.type == 'user_remove'}
			{#await client.api.fetchUser(system.id) then user}
				{#if system.type == 'user_added'}
					added
				{:else if system.type == 'user_remove'}
					removed
				{/if}
				{getDisplayName(user)}.
			{/await}
		{/if}
	{/await}
{:else if system.type == 'channel_ownership_changed'}
	{#await Promise.all([system.from, system.to].map( (id) => client.api.fetchUser(id) )) then [from, to]}
		Channel ownership changed from {getDisplayName(from)} to {getDisplayName(to)}.
	{/await}
{:else if system.type == 'user_banned' || system.type == 'user_joined' || system.type == 'user_kicked' || system.type == 'user_left'}
	{#await client.api.fetchUser(system.id) then user}
		{@const displayName = getDisplayName(user)}
		<RoundedImage src={getDisplayAvatar(user)} width={24} height={24} name={displayName} />
		{displayName}
		{#if system.type == 'user_banned'}
			was banned.
		{:else if system.type == 'user_joined'}
			has joined the chat.
		{:else if system.type == 'user_kicked'}
			was kicked.
		{:else if system.type == 'user_left'}
			left the chat.
		{/if}
	{/await}
{/if}
