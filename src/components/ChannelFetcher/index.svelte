<script lang="ts">
  import { invoke } from '@tauri-apps/api';
  export let id: string;

  $: channel = invoke<Channel>('fetch_channel', { channelId: id });
</script>

{#await channel then channel}
  <slot {channel} />
{/await}
