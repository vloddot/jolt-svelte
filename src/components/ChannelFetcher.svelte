<script lang="ts">
	import { invoke } from '@tauri-apps/api';

	export let ids: string[];

	$: channels = Promise.all(ids.map((id) => invoke<Channel>('fetch_channel', { channel_id: id })));
</script>

{#await channels then channels}
	<slot {channels} />
{/await}
