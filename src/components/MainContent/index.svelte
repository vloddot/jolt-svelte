<script>
  import { currentChannelID, currentServerID, servers } from '$lib/stores';
  import Messages from './Messages/index.svelte';
  import ChannelFetcher from '$components/ChannelFetcher/index.svelte';

  $: server = $servers?.find(({ _id }) => _id === $currentServerID);
  $: channel_id = server?.channels.find((id) => id === $currentChannelID);
</script>

{#if channel_id !== undefined}
  <ChannelFetcher id={channel_id} let:channel>
    {#if channel !== undefined}
      {#if channel.channel_type === 'VoiceChannel'}
        Voice Channels are currently not supported.
      {:else}
        <Messages {channel} />
      {/if}
    {/if}
  </ChannelFetcher>
{/if}
