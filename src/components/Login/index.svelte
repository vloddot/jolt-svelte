<script lang="ts">
  import { fs, invoke } from '@tauri-apps/api';
  import './index.css';
  import { session } from '$lib/stores';

  let email: string;
  let password: string;
  let error: string | undefined = undefined;
  let mfaTicket: string | undefined = undefined;
  let mfaMethods: [MFAMethod, string][] | undefined = undefined;

  async function login() {
    let payload: LoginPayload;
    try {
      payload = await invoke<LoginPayload>('login', { email, password });
    } catch (e: any) {
      error = e;
      return;
    }

    if (payload.type === 'Success') {
      await fs.writeTextFile('user_token', payload.token, { dir: fs.BaseDirectory.AppData });
      invoke('run_client');
    } else if (payload.type === 'Mfa') {
      mfaTicket = payload.ticket;
      mfaMethods = payload.allowed_methods.map((method) => [method, '']);
    }
  }

  async function loginMfa(method: MFAMethod, value: string) {
    let mfaResponse: Partial<Record<'totp_code' | 'recovery_code' | 'password', string>> = {};

    switch (method) {
      case 'Totp':
        mfaResponse.totp_code = value;
        break;
      case 'Recovery':
        mfaResponse.recovery_code = value;
        break;
      case 'Password':
        mfaResponse.password = value;
        break;
    }

    let mfaSession: Session;
    try {
      mfaSession = await invoke<Session>('login_mfa', {
        mfaTicket,
        mfaResponse,
      });
    } catch (e: any) {
      error = e;
      return;
    }

    session.set(mfaSession);

    await fs.writeTextFile('user_token', mfaSession.token, {
      dir: fs.BaseDirectory.AppData,
    });

    invoke('run_client');
  }

  function displayMethod(method: MFAMethod): string {
    return {
      Totp: 'TOTP',
      Recovery: 'Recovery Code',
      Password: 'Password',
    }[method];
  }
</script>

<form on:submit|preventDefault={login}>
  <input type="email" placeholder="Email" bind:value={email} />
  <input type="password" placeholder="Password" bind:value={password} />
  <button type="submit">Login</button>
</form>

{#if error}
  <p>{error}</p>
{/if}

{#if mfaMethods !== undefined}
  {#each mfaMethods as [method, value]}
    <form on:submit|preventDefault={() => loginMfa(method, value)}>
      <input type="text" placeholder={displayMethod(method)} bind:value />
      <button type="submit">Login with {displayMethod(method)}</button>
    </form>
  {/each}
{/if}
