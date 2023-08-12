<script lang="ts">
  import { getDisplayAvatar } from '$lib/helpers';
  import { currentServerID, settings } from '$lib/stores';
  import { invoke } from '@tauri-apps/api';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { userCacheKey } from '$components/UserFetcher';
  import UserFetcher from '$components/UserFetcher/index.svelte';
  import { _ } from 'svelte-i18n';

  let members: Member[] = [];
  let users = writable<User[]>([]);

  setContext(userCacheKey, users);

  $: {
    if ($currentServerID !== null) {
      invoke<MemberResponseAll>('fetch_members', { serverId: $currentServerID }).then(
        (response) => {
          members = response.members;
          users.set(response.users);
        }
      );
    }
  }
</script>

{#each members as member}
  <UserFetcher id={member._id.user} let:user>
    {#if user?.online ?? true}
      <div>
        {#if !$settings.lowDataMode}
          <img
            src={getDisplayAvatar(member, user)}
            alt={member.nickname}
            width="24"
            height="24"
            class="rounded-3xl inline aspect-square"
          />
        {/if}

        {member.nickname ?? user?.username ?? `<${$_('user.unknown')}>`}
      </div>
    {/if}
  </UserFetcher>
{/each}
