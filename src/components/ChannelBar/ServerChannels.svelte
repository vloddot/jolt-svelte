<script lang="ts">
  import { servers, selectedServerID } from '$lib/stores';
  import ChannelFetcher from '$components/ChannelFetcher/index.svelte';
  import Channel from './Channel.svelte';
  import ChannelCategory from './Category.svelte';
  let unsortedChannels: (string | undefined)[] = [];
  let categories: Category[] = [];

  $: {
    const server = $servers?.find(({ _id }) => _id === $selectedServerID) ?? null;

    categories = server?.categories ?? [];

    unsortedChannels =
      server?.channels.filter(
        (channel) =>
          categories.find(
            (category) => channel !== undefined && !category.channels.includes(channel)
          ) === undefined
      ) ?? [];
  }
</script>

{#each unsortedChannels as channel}
  {#if channel !== undefined}
    <ChannelFetcher id={channel} let:channel>
      {#if channel !== undefined}
        <Channel {channel} />
      {/if}
    </ChannelFetcher>
  {/if}
{/each}

{#each categories as category}
  <ChannelCategory {category} let:channel>
    {#if channel !== undefined}
      <Channel {channel} />
    {/if}
  </ChannelCategory>
{/each}
