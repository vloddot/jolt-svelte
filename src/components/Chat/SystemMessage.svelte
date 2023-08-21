<script lang="ts">
	import { getAutumnURL, getDefaultUserAvatar } from '$lib/util';
	import UserFetcher from '@components/UserFetcher.svelte';
	import { _ } from 'svelte-i18n';

	export let system: SystemMessage;
</script>

{#if system.type === 'text'}
	{system.content}
{:else if system.type === 'channel_description_changed' || system.type === 'channel_icon_changed' || system.type === 'channel_renamed' || system.type === 'user_added' || system.type === 'user_remove'}
	<UserFetcher ids={[system.by]} let:users>
		{#if users !== undefined}
			<img
				src={users[0].avatar === undefined
					? getDefaultUserAvatar(users[0]._id)
					: getAutumnURL(users[0].avatar)}
				alt={users[0].username}
			/>
			{users[0].username}
		{/if}
		{#if system.type === 'channel_description_changed'}
			{$_('channel.description.change')}.
		{:else if system.type === 'channel_icon_changed'}
			{$_('channel.icon.change')}.
		{:else if system.type === 'channel_renamed'}
			{$_('channel.rename-to')} {system.name}.
		{:else if system.type === 'user_added' || system.type === 'user_remove'}
			<UserFetcher ids={[system.id]} let:users>
				{#if users !== undefined}
					{#if system.type === 'user_added'}
						{$_('added')} {users[0].username}.
					{:else if system.type === 'user_remove'}
						{$_('removed')} {users[0].username}.
					{/if}
				{/if}
			</UserFetcher>
		{/if}
	</UserFetcher>
{:else if system.type === 'channel_ownership_changed'}
	<UserFetcher ids={[system.from, system.to]} let:users>
		{#if users !== undefined}
			{$_('channel.ownership.changed-from')}
			{users[0].username} to {users[1].username}.
		{/if}
	</UserFetcher>
{:else if system.type === 'user_banned' || system.type === 'user_joined' || system.type === 'user_kicked' || system.type === 'user_left'}
	<UserFetcher ids={[system.id]} let:users>
		{#if users !== undefined}
			{users[0].username}
			{#if system.type === 'user_banned'}
				{$_('user.was-banned')}.
			{:else if system.type === 'user_joined'}
				{$_('user.chat.joined')}.
			{:else if system.type === 'user_kicked'}
				{$_('user.was-kicked')}.
			{:else if system.type === 'user_left'}
				{$_('user.chat.left')}.
			{/if}
		{/if}
	</UserFetcher>
{/if}
