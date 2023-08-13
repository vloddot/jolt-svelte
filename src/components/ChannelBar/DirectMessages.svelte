<script lang="ts">
  import ChannelComponent from '$components/ChannelBar/Channel.svelte';
  import { invoke } from '@tauri-apps/api';
  import { onMount } from 'svelte';

  let channels: Channel[] = [];
  let savedMessages: Extract<Channel, { channel_type: 'SavedMessages' }> | undefined;

  onMount(() => {
    invoke<Channel[]>('fetch_direct_messages').then((result) => {
      channels = result;
      savedMessages = channels.find(
        (channel) => channel.channel_type === 'SavedMessages'
      ) as Extract<ChannelComponent, { channel_type: 'SavedMessages' }>;
    });
  });
</script>

{#if savedMessages !== undefined}
  <ChannelComponent channel={savedMessages} />
{/if}

{#each channels as channel}
  {#if channel.channel_type !== 'SavedMessages'}
    <ChannelComponent {channel} />
  {/if}
{/each}
