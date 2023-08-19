<script lang="ts">
	import ChannelItem from './ChannelItem.svelte';
	import { getAutumnURL, getDefaultUserAvatar } from '$lib/util';
	import { _ } from 'svelte-i18n';
	import { getContext } from 'svelte';
	import { userIDKey } from '@components/ChannelBar';
	import UserFetcher from '@components/UserFetcher.svelte';

	const user_id: string = getContext(userIDKey);

	function getChannelIcon(channel: Exclude<Channel, { channel_type: 'DirectMessage' }>): string {
		if (channel.channel_type === 'SavedMessages') {
			return '/note.svg';
		}

		if (channel.icon !== undefined) {
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
			ids={[channel.recipients[0] === user_id ? channel.recipients[1] : channel.recipients[0]]}
			let:users={[user]}
		>
			<ChannelItem
				src={user.avatar === undefined ? getDefaultUserAvatar(user._id) : getAutumnURL(user.avatar)}
				name={user.username}
				width={32}
				height={32}
				rounded
				id={channel._id}
			/>
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
