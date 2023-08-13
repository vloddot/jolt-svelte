<script lang="ts">
  import { getDisplayAvatar } from '$lib/util';
  import { selectedServerID } from '$lib/stores';
  import { invoke } from '@tauri-apps/api';
  import { writable } from 'svelte/store';
  import UserFetcher from '$components/UserFetcher/index.svelte';
  import { _ } from 'svelte-i18n';
  import MemberComponent from './MemberComponent.svelte';

  let members: Member[] = [];
  let users = writable<User[]>([]);

  $: invoke<MemberResponseAll>('fetch_members', { serverId: $selectedServerID }).then(
    (response) => {
      members = response.members;
      users.set(response.users);
    }
  );
</script>

{#each members as member}
  <UserFetcher id={member._id.user} let:user>
    {#if user?.online ?? true}
      <div role="listitem">
        <MemberComponent
          src={getDisplayAvatar(member, user)}
          displayName={member.nickname ?? user?.username ?? `<${$_('user.unknown')}`}
        />
      </div>
    {/if}
  </UserFetcher>
{/each}
