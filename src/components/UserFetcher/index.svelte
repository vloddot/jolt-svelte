<script lang="ts">
  import { invoke } from '@tauri-apps/api';

  export let id: string;

  $: user = invoke<User>('fetch_user', { userId: id });
</script>

{#await user then user}
  <slot {user} />
{/await}
