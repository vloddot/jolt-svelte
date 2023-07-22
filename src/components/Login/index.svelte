<script lang="ts">
  import { fs, invoke } from '@tauri-apps/api';
  import './index.css';

  let email: string;
  let password: string;
  let error: string | undefined = undefined;

  async function login() {
    try {
      const token = await invoke<string>('login', { email, password });
      await fs.writeTextFile('user_token', token, { dir: fs.BaseDirectory.AppData });

      invoke('run_client');
    } catch (e: any) {
      error = e;
    }
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
