<script lang="ts">
	import '$lib/index.css';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { LayoutParams } from './$types';
	import { selectedChannelIDKey } from '@routes/(app)/context';
	import { getContext } from '$lib/context';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import { clientKey } from '@routes/context';
	import { onMount } from 'svelte';

	$: pageParams = $page.params as LayoutParams;

	const client = getContext(clientKey)!;
	const selectedChannelID = getContext(selectedChannelIDKey) ?? writable();

	$: selectedChannelID.set(pageParams.id);

	let dms: Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }>[] | undefined =
		undefined;

	$: savedMessagesChannel = dms?.find((channel) => channel.channel_type == 'SavedMessages');

	function fetchDMs() {
		client.api.fetchDirectMessages().then((result) => (dms = result));
	}

	onMount(() => {
		if (client.ready) {
			fetchDMs();
		}
	});

	client.on('Ready', fetchDMs);
</script>

<div class="channel-bar-container">
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
