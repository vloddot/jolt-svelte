<script lang="ts">
  import { channelCacheKey } from './index';
  import { invoke } from '@tauri-apps/api';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let id: string;

  const channelCache = getContext<Writable<Channel[]> | undefined>(channelCacheKey);
  let channel: Channel | undefined;

  async function updateChannel(id: string) {
    if ($channelCache !== undefined) {
      channel = $channelCache.find((channel) => channel._id === id);
    } else {
      channel = await invoke<Channel>('fetch_channel', { channelId: id });
    }
  }

  $: updateChannel(id);
</script>

<slot {channel} />
