<script lang="ts">
	import { page } from '$app/stores';
	import { getContext } from '$lib/context';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import { clientKey } from '@routes/context';
	import { onMount } from 'svelte';
	import ChannelItem from '@components/ChannelBar/ChannelItem.svelte';
	import { base } from '$app/paths';
	import GenericUserCircleIcon from '@components/Icons/GenericUserCircleIcon.svelte';

	const client = getContext(clientKey)!;

	let dms: Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }>[] = [];

	$: savedMessagesChannel = dms?.find((channel) => channel.channel_type == 'SavedMessages');

	function updateDMs() {
		dms = Array.from(client.cache.channels.values()).filter((channel) =>
			['DirectMessage', 'Group', 'SavedMessages'].includes(channel.channel_type)
		) as typeof dms;

		if ((dms.length ?? 0) == 0 && client.ready) {
			client.fetchDirectMessages().then((result) => (dms = result));
		}
	}

	client.on('Ready', updateDMs);
	onMount(updateDMs);
</script>

<div class="channel-bar-container">
	<ChannelItem href="{base}/friends" selected={$page.url.pathname == `${base}/friends`}>
		<GenericUserCircleIcon />

		<!-- janky hack, mate -->
		<span>Friends</span>
	</ChannelItem>

	{#if dms != undefined}
		{#if savedMessagesChannel != undefined}
			<ChannelComponent channel={savedMessagesChannel} />
		{/if}
		{#each dms as dm}
			{#if dm.channel_type != 'SavedMessages'}
				<ChannelComponent channel={dm} />
			{/if}
		{/each}
	{/if}
</div>

<slot />
