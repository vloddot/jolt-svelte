<script lang="ts">
  import { fs, invoke } from '@tauri-apps/api';
  import './index.css';

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
    const token = sessionToken.trim();
    if (token !== '') {
      
    }

    let mfaResponse:
      | { totp_code: string }
      | { recovery_code: string }
      | { password: string }
      | undefined = undefined;

    const totp_code = mfaMethods.find(([method]) => method === 'Totp')?.[1].trim();
    const recovery_code = mfaMethods.find(([method]) => method === 'Recovery')?.[1].trim();
    const mfaPassword = mfaMethods.find(([method]) => method === 'Password')?.[1].trim();

    if (totp_code !== undefined) {
      if (totp_code !== '') {
        mfaResponse = { totp_code };
      }
    } else if (recovery_code !== undefined) {
      if (recovery_code !== '') {
        mfaResponse = { recovery_code };
      }
    } else if (mfaPassword !== undefined) {
      if (mfaPassword !== '') {
        mfaResponse = { password: mfaPassword };
      }
    }

    let payload: LoginPayload;
    try {
      payload = await invoke<LoginPayload>('login', {
        email,
        password,
        mfaResponse,
        mfaTicket,
      });
    } catch (e: any) {
      error = e;
      return;
    }

    if (payload.type === 'Success') {
      // save user token for conrurrent sessions
      await fs.writeTextFile('user_token', payload.token, { dir: fs.BaseDirectory.AppData });
      invoke('run_client');
    } else if (payload.type === 'Mfa') {
      mfaTicket = payload.ticket;
      mfaMethods = payload.allowed_methods.map((method) => [method, '']);

      if (mfaResponse !== undefined) {
        error =
          'MFA method is not allowed. The following methods are allowed: ' +
          payload.allowed_methods.join(',');
      }
    }
  }

  async function loginWithSessionToken() {
    await fs.writeTextFile('user_token', sessionToken, { dir: fs.BaseDirectory.AppData });
    await invoke('login_with_token', { token: sessionToken });
    invoke('run_client');
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

<div class="w-full h-full flex items-center flex-col justify-center relative">
  <div class="rounded-xl relative flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-6 pt-12 pb-6 max-w-[90%] mb-auto">
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

    {#if error}
      <p>{error}</p>
    {/if}
  </div>
</div>
