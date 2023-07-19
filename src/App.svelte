<script lang="ts">
  import './index.css';
  import Login from '$components/Login/index.svelte';
  import ServerSidebar from '$components/ServerSidebar/index.svelte';
  import MainContent from '$components/MainContent/index.svelte';
  import ChannelBar from '$components/ChannelBar/index.svelte';
  import MembersList from '$components/MembersList/index.svelte';
  import { channels, emojis, servers, users } from '$lib/stores';
  import { event, fs, invoke } from '@tauri-apps/api';
  import { onMount } from 'svelte';

  let show: 'main' | 'login' | null = null;
  onMount(async () => {
    if (await fs.exists('user_token', { dir: fs.BaseDirectory.AppData })) {
      const token = await fs.readTextFile('user_token', {
        dir: fs.BaseDirectory.AppData,
      });

      await invoke('login_with_token', { token });
      invoke('run_client');
    } else {
      show = 'login';
    }

    event.listen<ReadyPayload>('ready', (event) => {
      users.set(event.payload.users);
      servers.set(event.payload.servers);
      channels.set(event.payload.channels);
      emojis.set(event.payload.emojis);
      show = 'main';
    });
  });
</script>

{#if show !== null}
  {#if show === 'login'}
    <Login />
  {:else if show === 'main'}
    <span class="grid-container">
      <span class="server-sidebar-container">
        <ServerSidebar />
      </span>
      <span class="channel-bar-container">
        <ChannelBar />
      </span>
      <span class="main-content-container">
        <MainContent />
      </span>
      <span class="right-sidebar-container">
        <MembersList />
      </span>
    </span>
  {/if}
{/if}
