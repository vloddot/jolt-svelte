<script lang="ts">
	import { invoke } from '@tauri-apps/api';

	export let ids: string[];

	$: users = Promise.all(ids.map((id) => invoke<User>('fetch_user', { user_id: id })));
</script>

{#await users then users}
	<slot {users} />
{:catch}
	<slot name="catch" />
{/await}
