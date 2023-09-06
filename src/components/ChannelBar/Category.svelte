<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import './Category.css';

	const client = getContext(clientKey)!;
	export let category: Category;
</script>

<details open>
	<summary class="category-summary" role="group">{category.title}</summary>
	<div class="ml-2">
		{#each category.channels as id}
			{#await client.api.fetchChannel(id) then channel}
				<slot {channel} />
			{/await}
		{/each}
	</div>
</details>
