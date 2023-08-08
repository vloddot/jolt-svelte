<script lang="ts">
  import { getAutumnURL } from '$lib/helpers';
  import { currentServerID } from '$lib/stores';
  import { invoke } from '@tauri-apps/api';

  let members: Member[] = [];
  let users: User[] = [];

  $: {
    const server = $currentServerID;
    if (server !== null) {
      invoke<MemberResponseAll>('fetch_members', { server }).then((response) => {
        members = response.members;
        users = response.users;
      });
    }
  }

  function getAvatar(member: Member): string {
    if (member.avatar !== undefined) {
      return getAutumnURL(member.avatar);
    }

    const userAvatar = users.find((user) => user._id === member._id.user)?.avatar;

    if (userAvatar === undefined) {
      return '/user.svg';
    } else {
      return getAutumnURL(userAvatar);
    }
  }

  function getName(member: Member): string {
    if (member.nickname !== undefined) {
      return member.nickname;
    }

    const username = users.find((user) => user._id === member._id.user)?.username;

    if (username === undefined) {
      return '<Unknown User>';
    } else {
      return username;
    }
  }
</script>

{#each members as member}
  <div>
    <img
      src={getAvatar(member)}
      alt={member.nickname}
      width="24"
      height="24"
      class="rounded-3xl inline aspect-square"
    />

    {getName(member)}
  </div>
{/each}
