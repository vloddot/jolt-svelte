<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getAutumnURL, getDisplayAvatar, getDisplayName } from '$lib/util';
	import { clientKey, settingsKey } from '@routes/context';
	import PencilSquare from '@components/Icons/PencilSquareIcon.svelte';
	import UserGroup from '@components/Icons/UserGroupIcon.svelte';
	import Hash from '@components/Icons/HashIcon.svelte';
	import SpeakerWave from '@components/Icons/SpeakerWaveIcon.svelte';
	import ChannelItem from './ChannelItem.svelte';
	import type { ComponentType } from 'svelte';
	import GenericUserCircleIcon from '@components/Icons/GenericUserCircleIcon.svelte';
	import { selectedChannelKey, selectedServerKey } from '@routes/(app)/context';

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const server = getContext(selectedServerKey);
	const selectedChannel = getContext(selectedChannelKey);

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
			$server == undefined ? `channels/${id}` : `servers/${$server._id}/channels/${id}`
		}`;
	}
</script>

{#if channel.channel_type == 'DirectMessage'}
	{#if channel.active}
		{@const user = client.cache.users.get(
			channel.recipients[0] == client.user?._id ? channel.recipients[1] : channel.recipients[0]
		)}
		{#if user == undefined}
			<ChannelItem
				href={getChannelHref(channel._id)}
				selected={$selectedChannel?._id == channel._id}
			>
				<GenericUserCircleIcon />

				<span class="channel-name">Unknown User</span>
			</ChannelItem>
		{:else}
			<ChannelItem
				href={getChannelHref(channel._id)}
				selected={$selectedChannel?._id == channel._id}
			>
				{@const name = getDisplayName(user)}

				{#if $settings['jolt:low-data-mode']}
					<GenericUserCircleIcon />
				{:else}
					<img class="cover" src={getDisplayAvatar(user)} alt={name} />
				{/if}

				<span class="channel-name">{name}</span>
			</ChannelItem>
		{/if}
	{/if}
{:else if channel.channel_type == 'TextChannel' || channel.channel_type == 'VoiceChannel' || channel.channel_type == 'Group' || channel.channel_type == 'SavedMessages'}
	<ChannelItem href={getChannelHref(channel._id)} selected={$selectedChannel?._id == channel._id}>
		{@const icon = getChannelIcon(channel)}
		{@const name = channel.channel_type == 'SavedMessages' ? 'Saved Notes' : channel.name}

		{#if typeof icon == 'string'}
			<img class="cover" src={icon} alt={name} />
		{:else}
			<svelte:component this={icon} />
		{/if}

		<span class="channel-name">{name}</span>
	</ChannelItem>
{/if}

<style lang="scss">
	.channel-name {
		font-size: 0.90625rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
