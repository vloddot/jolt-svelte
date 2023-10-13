<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getAutumnURL, getDisplayAvatar, getDisplayName } from '$lib/util';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { clientKey, settingsKey } from '@routes/context';
	import PencilSquare from '@components/Icons/PencilSquareIcon.svelte';
	import UserGroup from '@components/Icons/UserGroupIcon.svelte';
	import Hash from '@components/Icons/HashIcon.svelte';
	import SpeakerWave from '@components/Icons/SpeakerWaveIcon.svelte';
	import ChannelItem from './ChannelItem.svelte';
	import type { ComponentType } from 'svelte';
	import UserIcon from '@components/Icons/UserIcon.svelte';

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const selectedChannelID = getContext(selectedChannelIDKey);
	const selectedServerID = getContext(selectedServerIDKey);

	function getChannelIcon(
		channel: Exclude<Channel, { channel_type: 'DirectMessage' }>
	): ComponentType | string {
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
			<ChannelItem href={getChannelHref(channel._id)} selected={$selectedChannelID == channel._id}>
				{@const name = getDisplayName(user)}

				{#if $settings['jolt:low-data-mode']}
					<UserIcon />
				{:else}
					<img class="cover" src={getDisplayAvatar(user)} alt={name} />
				{/if}

				{name}
			</ChannelItem>
		{:catch}
			<ChannelItem href={getChannelHref(channel._id)} selected={$selectedChannelID == channel._id}>
				<UserIcon />

				Unknown User
			</ChannelItem>
		{/await}
	{/if}
{:else if channel.channel_type == 'TextChannel' || channel.channel_type == 'VoiceChannel' || channel.channel_type == 'Group' || channel.channel_type == 'SavedMessages'}
	<ChannelItem href={getChannelHref(channel._id)} selected={$selectedChannelID == channel._id}>
		{@const icon = getChannelIcon(channel)}
		{@const name = channel.channel_type == 'SavedMessages' ? 'Saved Notes' : channel.name}

		{#if typeof icon == 'string'}
			<img class="cover" src={icon} alt={name} />
		{:else}
			<svelte:component this={icon} />
		{/if}

		{name}
	</ChannelItem>
{/if}
