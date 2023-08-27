<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { LayoutParams } from './$types';
	import { clientReadyKey, getContext, selectedChannelIDKey, setContext } from '$lib/context';
	import { invoke } from '@tauri-apps/api';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';

	$: pageParams = $page.params as LayoutParams;

	const selectedChannelID = writable<string | undefined>(undefined);
	setContext(selectedChannelIDKey, selectedChannelID);

	$: selectedChannelID.set(pageParams.id);

	type SavedMessagesChannel = Extract<Channel, { channel_type: 'SavedMessages' }>;

	let dms: Channel[] = [];
	let savedMessagesChannel: SavedMessagesChannel | undefined = undefined;

	const clientReady = getContext(clientReadyKey);

	$: if ($clientReady) {
		invoke<Channel[]>('fetch_direct_messages').then((result) => {
			dms = result;
			savedMessagesChannel = result.find(
				(dm) => dm.channel_type == 'SavedMessages'
			) as SavedMessagesChannel;
		});
	}
</script>

<div class="channel-bar-container">
	{#if savedMessagesChannel != undefined}
		<ChannelComponent channel={savedMessagesChannel} />
	{/if}

	{#each dms as dm}
		{#if dm.channel_type != 'SavedMessages'}
			<ChannelComponent channel={dm} />
		{/if}
	{/each}
</div>

<slot />
