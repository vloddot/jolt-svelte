<script lang="ts">
  import { invoke } from "@tauri-apps/api";
  import { onMount } from "svelte";

  export let channel: Channel | string;
  let user: User | null | undefined = null;

  onMount(() => {
    if (typeof channel !== 'string' && channel.channel_type === 'DirectMessage') {
      invoke<User>('fetch_user', { user: channel.recipients[1] }).then((result) => user = result).catch(() => user = undefined);
    }
  });
</script>

<div>
  {#if typeof channel === 'string'}
    Deleted Channel {channel}
  {:else if channel.channel_type === 'SavedMessages'}
    <img src="/note.svg" width="24" height="24" alt="Saved Messages" />
    Notes
  {:else if channel.channel_type === 'DirectMessage' && channel.active && user !== null}
    {#if user === undefined}
      <img
        src={`https://avatars.dicebear.com/api/open-peeps/${Math.round(Math.random() * 100)}.svg`}
        alt="Unkown User"
      />
      &gt;Unkown User&lt;
    {:else}
      <img
        src={user.avatar === undefined
          ? `https://avatars.dicebear.com/api/open-peeps/${Math.round(Math.random() * 100)}.svg`
          : `https://autumn.revolt.chat/${user.avatar.tag}/${user.avatar._id}`
        }
        alt={user.username}
        width="32"
        height="32"
      />
    {/if}
    {user.username}
  {:else if channel.channel_type === 'Group'}
    <img src="/group.svg" alt={`${channel.name} Group`} width="24" height="24" />
  {:else if channel.channel_type === 'TextChannel'}
    <img src="/hashtag.svg" alt={channel.name} width="24" height="24" />
    {channel.name}
  {:else if channel.channel_type === 'VoiceChannel'}
    <img src="/headset.svg" alt={channel.name} width="24" height="24" />
    {channel.name}
  {/if}
</div>
