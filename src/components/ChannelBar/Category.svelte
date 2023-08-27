<script lang="ts">
	import { fetchChannel } from '$lib/util';
	import './Category.css';

	export let category: Category;
</script>

<details open>
	<summary class="category-summary" role="group">{category.title}</summary>
	<div class="ml-2">
		{#each category.channels as id}
			{#await fetchChannel(id) then channel}
				<slot {channel} />
			{/await}
		{/each}
	</div>
</details>
