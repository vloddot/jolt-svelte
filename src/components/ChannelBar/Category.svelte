<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';

	const client = getContext(clientKey)!;
	export let category: Category;
</script>

<details open>
	<summary>{category.title}</summary>
	{#each category.channels as id}
		{#await client.fetchChannel(id) then channel}
			<slot {channel} />
		{/await}
	{/each}
</details>
