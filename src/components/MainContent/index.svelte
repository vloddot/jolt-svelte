<script>
  import { channels, currentChannelID, currentServerID, servers } from '$lib/stores';
  import Messages from './Messages/index.svelte';

  $: server = $servers?.find(({ _id }) => _id === $currentServerID) || $servers?.[0];
  $: channel_id = server?.channels.find((id) => id === $currentChannelID) || server?.channels[0];
  $: channel = $channels?.find((channel) => channel._id === channel_id);
</script>

{#if channel !== undefined}
  {#if channel.channel_type === 'VoiceChannel'}
    Voice Channels are currently not supported.
  {:else}
    <Messages {channel} />
  {/if}
{/if}
