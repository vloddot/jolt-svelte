<script lang="ts">
  import Messages from './Messages/index.svelte';
  import ChannelFetcher from '$components/ChannelFetcher/index.svelte';
  import { selectedChannelID } from '$lib/stores';
</script>

{#if $selectedChannelID !== null}
  <ChannelFetcher id={$selectedChannelID} let:channel>
    {#if channel !== undefined}
      {#if channel.channel_type === 'VoiceChannel'}
        Voice Channels are currently not supported.
      {:else}
        <Messages {channel} />
      {/if}
    {/if}
  </ChannelFetcher>
{/if}
