<script lang="ts">
	import { clientReadyContext, getContext } from '$lib/context';
	import { invoke } from '@tauri-apps/api';

	export let ids: string[];

	const clientReady = getContext(clientReadyContext);

	$: users = $clientReady
		? Promise.all(ids.map((user_id) => invoke<User>('fetch_user', { user_id })))
		: undefined;
</script>

{#if users !== undefined}
	{#await users then users}
		<slot {users} />
	{:catch}
		<slot name="catch" />
	{/await}
{/if}
