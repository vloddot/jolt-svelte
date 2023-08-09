<script lang="ts">
  import './Category.css';
  import ChannelFinder from '$components/ChannelFetcher.svelte';

  export let category: Category;
</script>

<details open>
  <summary class="category-summary" role="group">
    {category.title}
  </summary>
  <div class="ml-2">
    {#each category.channels as channel}
      <ChannelFinder id={channel} let:channel>
        <slot {channel} />
      </ChannelFinder>
    {/each}
  </div>
</details>
