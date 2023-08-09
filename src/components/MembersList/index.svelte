<script lang="ts">
  import { getAutumnURL } from '$lib/helpers';
  import { currentServerID } from '$lib/stores';
  import { invoke } from '@tauri-apps/api';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { userCacheKey } from '$lib/fetcher';
  import UserFetcher from '$components/UserFetcher.svelte';

  let members: Member[] = [];
  let users = writable<User[]>([]);

  setContext(userCacheKey, users);

  $: {
    if ($currentServerID !== null) {
      invoke<MemberResponseAll>('fetch_members', { serverId: $currentServerID }).then((response) => {
        members = response.members;
        users.set(response.users);
      });
    }
  }

  function getAvatar(member: Member, user?: User): string {
    if (member.avatar !== undefined) {
      return getAutumnURL(member.avatar);
    }

    if (user?.avatar === undefined) {
      return '/user.svg';
    } else {
      return getAutumnURL(user?.avatar);
    }
  }
</script>

{#each members as member}
  <UserFetcher id={member._id.user} let:user>
    {#if user?.online ?? true}
      <div>
        <img
          src={getAvatar(member, user)}
          alt={member.nickname}
          width="24"
          height="24"
          class="rounded-3xl inline aspect-square"
        />

        {member.nickname ?? user?.username ?? '<Unknown User>'}
      </div>
    {/if}
  </UserFetcher>
{/each}
