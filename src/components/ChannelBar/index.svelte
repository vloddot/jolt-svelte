<script lang="ts">
  import ChannelComponent from './Channel.svelte';
  import { currentServerID, servers } from '$lib/stores';
  import ChannelFinder from '$components/ChannelFetcher.svelte';
  import ChannelCategory from './Category.svelte';

  let unsortedChannels: (string | undefined)[] = [];
  let categories: Category[] = [];

  $: {
    const server =
      $currentServerID === null
        ? null
        : $servers?.find(({ _id }) => _id === $currentServerID) ?? null;

    categories = server?.categories ?? [];

    unsortedChannels =
      server?.channels.filter(
        (channel) =>
          categories.find(
            (category) => channel !== undefined && category.channels.includes(channel)
          ) === undefined
      ) ?? [];
  }
</script>

{#each unsortedChannels as channel}
  {#if channel !== undefined}
    <ChannelFinder id={channel} let:channel>
      {#if channel !== undefined}
        <ChannelComponent {channel} />
      {/if}
    </ChannelFinder>
  {/if}
{/each}

{#each categories as category}
  <ChannelCategory {category} let:channel>
    {#if channel !== undefined}
      <ChannelComponent {channel} />
    {/if}
  </ChannelCategory>
{/each}
