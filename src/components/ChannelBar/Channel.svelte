<script lang="ts">
	import { getContext } from '$lib/context';
	import { getAutumnURL, getDisplayAvatar, getDisplayName } from '$lib/util';
	import { clientKey, sessionKey, settingsKey } from '@routes/context';
	import { _ } from 'svelte-i18n';
	import ChannelItem from './ChannelItem.svelte';

	const settings = getContext(settingsKey)!;
	const session = getContext(sessionKey)!;
	const client = getContext(clientKey)!;

	function getChannelIcon(channel: Exclude<Channel, { channel_type: 'DirectMessage' }>): string {
		if (channel.channel_type == 'SavedMessages') {
			return '/note.svg';
		}

		if (channel.icon != undefined && !$settings['jolt:low-data-mode']) {
			return `${getAutumnURL(channel.icon, { max_side: '256' })}`;
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

{#if channel.channel_type == 'DirectMessage'}
	{#if channel.active}
		{#await client.api.fetchUser(channel.recipients[0] == $session.user_id ? channel.recipients[1] : channel.recipients[0]) then user}
			<ChannelItem
				src={$settings['jolt:low-data-mode'] ? '/user.svg' : getDisplayAvatar(user)}
				name={getDisplayName(user)}
				width={32}
				height={32}
				id={channel._id}
			/>
		{:catch}
			<ChannelItem
				src="/user.svg"
				name="<{$_('user.unknown')}>"
				alt={$_('user.unknown')}
				width={32}
				height={32}
				id={channel._id}
			/>
		{/await}
	{/if}
{:else if channel.channel_type == 'TextChannel' || channel.channel_type == 'VoiceChannel' || channel.channel_type == 'Group' || channel.channel_type == 'SavedMessages'}
	<ChannelItem
		src={getChannelIcon(channel)}
		name={channel.channel_type == 'SavedMessages' ? $_('channel.notes') : channel.name}
		width={24}
		height={24}
		id={channel._id}
	/>
{/if}
