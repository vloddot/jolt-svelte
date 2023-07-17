<script lang="ts">
  import ChannelComponent from './Channel.svelte';
  import { channels as channelStore, currentServerIndex, servers } from '$lib/stores';

  $: channels = $currentServerIndex === null
    ? $channelStore.filter((channel) => channel.channel_type === 'DirectMessage')
    : $servers[$currentServerIndex]?.channels.map((id) => $channelStore.find((channel) => channel._id === id) || id);
</script>

<div class="h-screen w-64 flex flex-col m-0">
  {#if channels !== undefined}
    {#each channels as channel}
      {#if typeof channel === 'string'}
        Deleted Channel {channel}
      {:else}
        <ChannelComponent {channel} />
      {/if}
    {/each}
  {/if}
</div>
