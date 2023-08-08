<script lang="ts">
  import { userCacheKey } from '$lib/fetcher';
  import { getContext } from 'svelte';
  import { users } from '$lib/stores';
  import type { Writable } from 'svelte/store';

  export let id: string;

  const userCache = getContext<Writable<User[]> | null>(userCacheKey);
  $: user = ($userCache ?? $users)?.find((user) => user._id === id);
</script>

<slot {user} />
