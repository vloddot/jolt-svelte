<script lang="ts">
  import './index.css';
  import Login from '$components/Login/index.svelte';
  import ServerSidebar from '$components/Sidebar/index.svelte';
  import MainContent from '$components/MainContent/index.svelte';
  import ChannelBar from '$components/ChannelBar/index.svelte';
  import MembersList from '$components/MembersList/index.svelte';
  import Settings from '$components/Settings.svelte';
  import { pageToShow, servers, session, settings } from '$lib/stores';
  import { event, invoke } from '@tauri-apps/api';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Modal from '$components/Modal.svelte';
  import '$lib/i18n';

  let modalError: string | null = null;

  onMount(async () => {
    try {
      const cachedSession: Session | null = JSON.parse(localStorage.getItem('session') || 'null');
      if (cachedSession !== null) {
        session.set(cachedSession);
        invoke('login_with_token', { sessionId: cachedSession._id, token: cachedSession.token })
          .then(() => invoke('run_client'))
          .catch((err) => {
            modalError = err;
            pageToShow.set('login');
          });
      } else {
        pageToShow.set('login');
      }
    } catch (e) {
      pageToShow.set('login');
    } finally {
      const settingsFromFs = localStorage.getItem('settings');
      if (settingsFromFs !== null) {
        settings.set(JSON.parse(settingsFromFs));
      }

      // websocket thread emits a ready event when it's ready to set stuff up
      event.listen<Server[]>('ready', (event) => {
        servers.set(event.payload);
        pageToShow.set('main');
      });
    }
  });
</script>

<Modal showModal={modalError !== null}>
  <h1 slot="header">{$_('error')}</h1>
  <div>{modalError}</div>
</Modal>

{#if $pageToShow !== null}
  {#if $pageToShow === 'login'}
    <Login />
  {:else if $pageToShow === 'main'}
    <span class="flex">
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
  {:else if $pageToShow === 'settings'}
    <Settings />
  {/if}
{/if}
