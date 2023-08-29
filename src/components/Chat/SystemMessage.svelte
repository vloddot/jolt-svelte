<script lang="ts">
	import { fetchUser, getDisplayAvatar, getDisplayName } from '$lib/util';
	import { _ } from 'svelte-i18n';

	export let system: SystemMessage;
</script>

{#if system.type == 'text'}
	{system.content}
{:else if system.type == 'channel_description_changed' || system.type == 'channel_icon_changed' || system.type == 'channel_renamed' || system.type == 'user_added' || system.type == 'user_remove'}
	{#await fetchUser(system.by) then user}
		{@const displayName = getDisplayName(user)}
		<img src={getDisplayAvatar(user)} alt={displayName} />
		{displayName}
		{#if system.type == 'channel_description_changed'}
			{$_('channel.description.change')}.
		{:else if system.type == 'channel_icon_changed'}
			{$_('channel.icon.change')}.
		{:else if system.type == 'channel_renamed'}
			{$_('channel.rename-to')} {system.name}.
		{:else if system.type == 'user_added' || system.type == 'user_remove'}
			{#await fetchUser(system.id) then user}
				{#if system.type == 'user_added'}
					{$_('added')}
				{:else if system.type == 'user_remove'}
					{$_('removed')}
				{/if}
				{getDisplayName(user)}.
			{/await}
		{/if}
	{/await}
{:else if system.type == 'channel_ownership_changed'}
	{#await Promise.all([system.from, system.to].map((id) => fetchUser(id))) then [from, to]}
		{$_('channel.ownership.changed-from')}
		{getDisplayName(from)} to {getDisplayName(to)}.
	{/await}
{:else if system.type == 'user_banned' || system.type == 'user_joined' || system.type == 'user_kicked' || system.type == 'user_left'}
	{#await fetchUser(system.id) then user}
		{@const displayName = getDisplayName(user)}
		<img src={getDisplayAvatar(user)} alt={displayName} />
		{displayName}
		{#if system.type == 'user_banned'}
			{$_('user.was-banned')}.
		{:else if system.type == 'user_joined'}
			{$_('user.chat.joined')}.
		{:else if system.type == 'user_kicked'}
			{$_('user.was-kicked')}.
		{:else if system.type == 'user_left'}
			{$_('user.chat.left')}.
		{/if}
	{/await}
{/if}
