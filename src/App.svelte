<script lang="ts">
  import './index.css';
  import Login from '$components/Login/index.svelte';
  import ServerSidebar from '$components/Sidebar/index.svelte';
  import MainContent from '$components/MainContent/index.svelte';
  import ChannelBar from '$components/ChannelBar/index.svelte';
  import MembersList from '$components/MembersList/index.svelte';
  import { channels, emojis, servers, users } from '$lib/stores';
  import { event, fs, invoke } from '@tauri-apps/api';
  import { onMount } from 'svelte';
  import Modal from '$components/Modal.svelte';

  // View to show.
  let show: 'main' | 'login' | null = null;

  let modalError: string | null = null;

  onMount(async () => {
    try {
      const token = localStorage.getItem('user_token');
      if (token !== null) {
        invoke('login_with_token', { token })
          .then(() => invoke('run_client'))
          .catch((err) => (modalError = err));
      } else {
        show = 'login';
      }
    } catch (e) {
      show = 'login';
    } finally {
      event.listen<ReadyPayload>('ready', (event) => {
        users.set(event.payload.users);
        servers.set(event.payload.servers);
        channels.set(event.payload.channels);
        emojis.set(event.payload.emojis);
        show = 'main';
      });
    }
  });
</script>

<Modal showModal={modalError !== null}>
  <h2 slot="header">Error</h2>
  <div>{modalError}</div>
</Modal>

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
