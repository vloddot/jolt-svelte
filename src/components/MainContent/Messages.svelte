<script lang="ts">
  import { channels, currentChannelID, currentServerID, servers } from '$lib/stores';
  import { invoke } from '@tauri-apps/api';
  import { onMount } from 'svelte';

  $: server = $servers.find(({ _id }) => _id === $currentServerID) || $servers[0];
  $: channel_id = server.channels.find((id) => id === $currentChannelID) || server.channels[0];
  $: channel = $channels.find((channel) => channel._id === channel_id);
  $: messages = channel.channel_type === 'TextChannel' && invoke<BulkMessageResponse>('fetch_messages', { channel: channel_id });

  onMount(() => {
    console.log(server);
    console.log(channel_id);
    console.log(channel);
    messages.then(console.log);
  });
</script>

{#await messages then messages}
  {#each messages.messages as message}
    {JSON.stringify(message)}
  {/each}
{/await}
