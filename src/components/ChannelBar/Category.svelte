<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';

	const client = getContext(clientKey)!;
	export let category: Category;
</script>

<details open>
	<summary>{category.title}</summary>
	{#each category.channels as id}
		{#await client.api.fetchChannel(id) then channel}
			<slot {channel} />
		{/await}
	{/each}
</details>

<style lang="scss">
	details {
		margin-top: 8px;
		> summary {
			user-select: none;
			margin-left: 8px;
			text-transform: uppercase;
			font-size: 10px;
			font-weight: 600;
			cursor: pointer;
		}
	}
</style>
