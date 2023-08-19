<script lang="ts">
	import '$lib/i18n';
	import { invoke } from '@tauri-apps/api';
	import { onMount, setContext } from 'svelte';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import { lowDataModeKey, userIDKey } from '@components/ChannelBar';

	export let userID: string;
	export let lowDataMode: boolean;

	setContext(userIDKey, userID);
	setContext(lowDataModeKey, lowDataMode);

	type SavedMessagesChannel = Extract<Channel, { channel_type: 'SavedMessages' }>;

	let dms: Channel[] = [];
	let savedMessagesChannel: SavedMessagesChannel | undefined;

	onMount(async () => {
		invoke<Channel[]>('fetch_direct_messages')
			.then((result) => {
				dms = result;
				savedMessagesChannel = dms.find(
					(dm) => dm.channel_type === 'SavedMessages'
				) as SavedMessagesChannel;
			});
	});
</script>

<div class="channel-bar-container">
	{#if savedMessagesChannel !== undefined}
		<ChannelComponent channel={savedMessagesChannel} />
	{/if}

	{#each dms as dm}
		{#if dm.channel_type !== 'SavedMessages'}
			<ChannelComponent channel={dm} />
		{/if}
	{/each}
</div>
