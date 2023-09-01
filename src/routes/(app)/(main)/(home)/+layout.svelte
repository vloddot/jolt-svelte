<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { LayoutParams } from './$types';
	import { dmsKey, selectedChannelIDKey } from '@routes/(app)/context';
	import { getContext, setContext } from '$lib/context';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';

	$: pageParams = $page.params as LayoutParams;

	const selectedChannelID = writable<string | undefined>(undefined);
	setContext(selectedChannelIDKey, selectedChannelID);

	$: selectedChannelID.set(pageParams.id);

	const dms = getContext(dmsKey);
	$: savedMessagesChannel = $dms?.find((channel) => channel.channel_type == 'SavedMessages');
</script>

<div class="channel-bar-container">
	{#if savedMessagesChannel != undefined}
		<ChannelComponent channel={savedMessagesChannel} />
	{/if}

	{#if $dms != undefined}
		{#each $dms as dm}
			{#if dm.channel_type != 'SavedMessages'}
				<ChannelComponent channel={dm} />
			{/if}
		{/each}
	{/if}
</div>

<slot />
