<script lang="ts">
  import { invoke } from '@tauri-apps/api';
  import './index.css';
  import { session } from '$lib/stores';
  import Modal from '$components/Modal.svelte';

  // current email input
  let email: string = '';

  // current password input
  let password: string = '';

  // current session token input
  let sessionToken: string = '';

  // error text to display
  let error: string | undefined = undefined;

  // MFA ticket to store for later
  let mfaTicket: string | undefined = undefined;

  // MFA Methods with their input fields' values
  let mfaMethods: [MFAMethod, string][] = [
    ['Totp', ''],
    ['Recovery', ''],
  ];

  async function login() {
    let mfaResponse:
      | { totp_code: string }
      | { recovery_code: string }
      | { password: string }
      | undefined = undefined;

    const totp_code = mfaMethods.find(([method]) => method === 'Totp')?.[1].trim();
    const recovery_code = mfaMethods.find(([method]) => method === 'Recovery')?.[1].trim();
    const mfaPassword = mfaMethods.find(([method]) => method === 'Password')?.[1].trim();

    if (totp_code !== undefined && totp_code !== '') {
      mfaResponse = { totp_code };
    } else if (recovery_code !== undefined && recovery_code !== '') {
      mfaResponse = { recovery_code };
    } else if (mfaPassword !== undefined && mfaPassword !== '') {
      mfaResponse = { password: mfaPassword };
    }

    invoke<LoginPayload>('login', {
      email,
      password,
      mfaResponse,
      mfaTicket,
    })
      .then(async (payload) => {
        if (payload.type === 'Success') {
          try {
            saveSession(payload);
          } finally {
            invoke('run_client');
          }
        } else if (payload.type === 'Mfa') {
          mfaTicket = payload.ticket;
          mfaMethods = payload.allowed_methods.map((method) => [method, '']);

          if (mfaResponse !== undefined) {
            error =
              'MFA method is not allowed. The following methods are allowed: ' +
              payload.allowed_methods.join(',');
          }
        }
      })
      .catch(({ error: err }) => {
        error = err;
        return;
      });
  }

  function saveSession(payload: Session) {
    session.set(payload);
    localStorage.setItem('user_token', payload.token);
  }

  async function loginWithSessionToken() {
    invoke('login_with_token', { token: sessionToken })
      .then(() => invoke('run_client'))
      .catch((err) => {
        error = err;
      });
  }

  function displayMfaMethod(method: string): string {
    return (
      {
        Totp: 'MFA TOTP',
        Recovery: 'MFA Recovery Code',
        Password: 'Password',
      }[method] ?? 'Unknown MFA Method'
    );
  }
</script>

<Modal showModal={error !== undefined}>
  <h1 slot="header">Error</h1>
  {error}
</Modal>

<div class="w-full h-full flex items-center flex-col justify-center relative">
  <div
    class="rounded-xl relative flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-6 pt-12 pb-6 max-w-[90%] mb-auto"
  >
    <form class="flex flex-col" on:submit|preventDefault={login}>
      <input type="email" placeholder="Email" bind:value={email} />
      <input type="password" placeholder="Password" bind:value={password} />

      {#each mfaMethods as [method, value]}
        <input type="text" placeholder={displayMfaMethod(method)} bind:value />
      {/each}

      <button type="submit">Login</button>
    </form>

    -- OR --

    <form class="flex flex-col" on:submit={loginWithSessionToken}>
      <input type="text" placeholder="Session token" bind:value={sessionToken} />
      <button type="submit">Login with Session Token</button>
    </form>
  </div>
</div>
