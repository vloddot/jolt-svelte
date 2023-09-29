<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getAutumnURL, getDisplayAvatar, getDisplayName } from '$lib/util';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { clientKey, settingsKey } from '@routes/context';
	import PencilSquare from '$lib/icons/pencil-square.svg';
	import UserGroup from '$lib/icons/user-group.svg';
	import Hash from '$lib/icons/hash.svg';
	import SpeakerWave from '$lib/icons/speaker-wave.svg';
	import User from '$lib/icons/user.svg';
	import ChannelItem from './ChannelItem.svelte';

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const selectedChannelID = getContext(selectedChannelIDKey);
	const selectedServerID = getContext(selectedServerIDKey);

	function getChannelIcon(channel: Exclude<Channel, { channel_type: 'DirectMessage' }>): string {
		if (channel.channel_type == 'SavedMessages') {
			return PencilSquare;
		}

		if (channel.icon != undefined && !$settings['jolt:low-data-mode']) {
			return getAutumnURL(channel.icon, { max_side: '256' });
		}

		switch (channel.channel_type) {
			case 'Group':
				return UserGroup;
			case 'TextChannel':
				console.log(`returning hash: ${Hash}`);
				return Hash;
			case 'VoiceChannel':
				return SpeakerWave;
		}
	}

	export let channel: Channel;

	function getChannelHref(id: string): string {
		return `${base}/${
			$selectedServerID == undefined
				? `channels/${id}`
				: `servers/${$selectedServerID}/channels/${id}`
		}`;
	}
</script>

{#if channel.channel_type == 'DirectMessage'}
	{#if channel.active}
		{#await client.api.fetchUser(channel.recipients[0] == client.user?._id ? channel.recipients[1] : channel.recipients[0]) then user}
			<ChannelItem
				src={$settings['jolt:low-data-mode'] ? User : getDisplayAvatar(user)}
				name={getDisplayName(user)}
				width={32}
				height={32}
				href={getChannelHref(channel._id)}
				selected={$selectedChannelID == channel._id}
			/>
		{:catch}
			<ChannelItem
				src={User}
				name="Unknown User"
				width={32}
				height={32}
				href={getChannelHref(channel._id)}
				selected={$selectedChannelID == channel._id}
			/>
		{/await}
	{/if}
{:else if channel.channel_type == 'TextChannel' || channel.channel_type == 'VoiceChannel' || channel.channel_type == 'Group' || channel.channel_type == 'SavedMessages'}
	<ChannelItem
		src={getChannelIcon(channel)}
		name={channel.channel_type == 'SavedMessages' ? 'Saved Notes' : channel.name}
		width={24}
		height={24}
		href={getChannelHref(channel._id)}
		selected={$selectedChannelID == channel._id}
	/>
{/if}
