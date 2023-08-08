<script lang="ts">
  import { channelCacheKey } from '$lib/fetcher';
  import { channels } from '$lib/stores';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let id: string;

  const channelCache = getContext<Writable<Channel[]> | null>(channelCacheKey);
  $: channel = ($channelCache ?? $channels)?.find((channel) => channel._id === id);
</script>

<slot {channel} />
