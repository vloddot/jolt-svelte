<script lang="ts">
	import { page } from '$app/stores';
	import { getContext } from '$lib/context';
	import '$lib/index.css';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { clientKey } from '@routes/context';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LayoutParams } from './$types';

	$: pageParams = $page.params as LayoutParams;

	const client = getContext(clientKey)!;
	const selectedChannelID = getContext(selectedChannelIDKey) ?? writable();
	const selectedServerID = getContext(selectedServerIDKey) ?? writable();

	$: selectedServerID.set(undefined);
	$: selectedChannelID.set(pageParams.id);

	let dms: Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }>[] | undefined =
		undefined;

	$: savedMessagesChannel = dms?.find((channel) => channel.channel_type == 'SavedMessages');

	function updateDMs() {
		dms = client.api.cache.channels.filter((channel) =>
			['DirectMessage', 'Group', 'SavedMessages'].includes(channel.channel_type)
		) as typeof dms;

		if ((dms?.length ?? 0) == 0 && client.ready) {
			client.api.fetchDirectMessages().then((result) => (dms = result));
		}
	}

	client.on('Ready', updateDMs);
	onMount(updateDMs);
</script>

<div role="list" class="channel-bar-container">
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
