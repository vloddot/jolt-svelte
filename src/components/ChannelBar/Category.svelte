<script lang="ts">
  import './Category.css';
  import ChannelFetcher from '$components/ChannelFetcher/index.svelte';

  export let category: Category;
</script>

<details open>
  <summary class="category-summary" role="group">
    {category.title}
  </summary>
  <div class="ml-2">
    {#each category.channels as channel}
      <ChannelFetcher id={channel} let:channel>
        <slot {channel} />
      </ChannelFetcher>
    {/each}
  </div>
</details>
