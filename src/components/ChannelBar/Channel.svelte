<script lang="ts">
	import ChannelItem from './ChannelItem.svelte';
	import { getAutumnURL, getDefaultUserAvatar } from '$lib/util';
	import { _ } from 'svelte-i18n';
	import UserFetcher from '@components/UserFetcher.svelte';
	import { redirect } from '@sveltejs/kit';
	import { getContext, sessionKey, settingsKey } from '$lib/context';

	const settings = getContext(settingsKey);
	const session = getContext(sessionKey);

	if ($session === undefined) {
		throw redirect(302, '/login');
	}

	function getChannelIcon(
		channel:
			| Exclude<Channel, { channel_type: 'DirectMessage' }>
			| (Extract<Channel, { channel_type: 'DirectMessage' }> & { user: User })
	): string {
		if (channel.channel_type === 'DirectMessage') {
			if ($settings?.lowDataMode) {
				return '/user.svg';
			}

			return channel.user.avatar === undefined
				? getDefaultUserAvatar(channel.user._id)
				: getAutumnURL(channel.user.avatar);
		}

		if (channel.channel_type === 'SavedMessages') {
			return '/note.svg';
		}

		if (channel.icon !== undefined && !$settings?.lowDataMode) {
			return getAutumnURL(channel.icon);
		}

		switch (channel.channel_type) {
			case 'Group':
				return '/group.svg';
			case 'TextChannel':
				return '/hash.svg';
			case 'VoiceChannel':
				return '/volume.svg';
		}
	}

	export let channel: Channel;
</script>

{#if channel.channel_type === 'DirectMessage'}
	{#if channel.active}
		<UserFetcher
			ids={[
				channel.recipients[0] === $session?.user_id ? channel.recipients[1] : channel.recipients[0]
			]}
			let:users
		>
			{#if users !== undefined}
				<ChannelItem
					src={getChannelIcon({ ...channel, user: users[0] })}
					name={users[0].username}
					width={32}
					height={32}
					rounded
					id={channel._id}
				/>
			{/if}
			<span slot="catch">
				<ChannelItem
					src="/user.svg"
					name="<{$_('user.unknown')}>"
					alt={$_('user.unknown')}
					width={32}
					height={32}
					rounded
					id={channel._id}
				/>
			</span>
		</UserFetcher>
	{/if}
{:else if channel.channel_type === 'TextChannel' || channel.channel_type === 'VoiceChannel' || channel.channel_type === 'Group' || channel.channel_type === 'SavedMessages'}
	<ChannelItem
		src={getChannelIcon(channel)}
		name={channel.channel_type === 'SavedMessages' ? 'Notes' : channel.name}
		width={24}
		height={24}
		id={channel._id}
	/>
{/if}
