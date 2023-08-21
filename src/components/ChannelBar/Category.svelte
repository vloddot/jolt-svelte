<script lang="ts">
	import './Category.css';
	import ChannelFetcher from '@components/ChannelFetcher.svelte';

	export let category: Category;
</script>

<details open>
	<summary class="category-summary" role="group">{category.title}</summary>
	<div class="ml-2">
		{#each category.channels as id}
			<ChannelFetcher ids={[id]} let:channels={[channel]}>
				<slot {channel} />
			</ChannelFetcher>
		{/each}
	</div>
</details>
