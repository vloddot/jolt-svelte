<script lang="ts">
	import '$lib/i18n';
	import { invoke } from '@tauri-apps/api';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import { clientReadyContext, getContext } from '$lib/context';

	type SavedMessagesChannel = Extract<Channel, { channel_type: 'SavedMessages' }>;

	let dms: Channel[] = [];
	let savedMessagesChannel: SavedMessagesChannel | undefined = undefined;

	const clientReady = getContext(clientReadyContext);

	$: if ($clientReady) {
		invoke<Channel[]>('fetch_direct_messages').then((result) => {
			dms = result;
			savedMessagesChannel = result.find(
				(dm) => dm.channel_type === 'SavedMessages'
			) as SavedMessagesChannel;
		});
	}
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
