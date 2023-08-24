<script lang="ts">
	import { clientReadyContext, getContext } from '$lib/context';
	import { invoke } from '@tauri-apps/api';

	export let ids: string[];

	const clientReady = getContext(clientReadyContext);

	$: channels = $clientReady
		? Promise.all(ids.map((id) => invoke<Channel>('fetch_channel', { channel_id: id })))
		: undefined;
</script>

{#if channels !== undefined}
	{#await channels then channels}
		<slot {channels} />
	{:catch}
		<slot name="catch" />
	{/await}
{/if}
