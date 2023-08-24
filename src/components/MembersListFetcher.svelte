<script lang="ts">
	import { clientReadyContext, getContext } from '$lib/context';
	import { invoke } from '@tauri-apps/api';

	export let server_id: string;

	const clientReady = getContext(clientReadyContext);

	$: response = $clientReady
		? invoke<MemberResponseAll>('fetch_members', { server_id })
		: undefined;
</script>

{#if response !== undefined}
	{#await response then response}
		<slot {response} />
	{:catch}
		<slot name="catch" />
	{/await}
{/if}
