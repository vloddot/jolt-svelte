<script lang="ts">
  import { userCacheKey } from '.';
  import { invoke } from '@tauri-apps/api';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let id: string;

  const userCache = getContext<Writable<User[]> | null>(userCacheKey);

  let user: User | undefined;
  async function updateUser(id: string) {
    if ($userCache !== undefined) {
      user = $userCache?.find((user) => user._id === id);
    } else {
      user = await invoke<User>('fetch_user', { user_id: id });
    }
  }

  $: updateUser(id);
</script>

<slot {user} />
