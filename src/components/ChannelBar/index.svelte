<script lang="ts">
  import ChannelComponent from './Channel.svelte';
  import { channels as channelStore, currentServerID, servers } from '$lib/stores';
  import { fetchUser, generateDicebearAvatar, getIconURL } from '$lib/helpers';

  $: channels = $currentServerID === null
    ? $channelStore.filter((channel) => channel.channel_type === 'DirectMessage' && channel.active)
    : $servers.find(({ _id }) => _id === $currentServerID).channels.map((id) => $channelStore.find((channel) => channel._id === id));
</script>

{#if channels !== undefined}
  {#each channels as channel}
    {#if channel !== undefined}
      {#if channel.channel_type === 'DirectMessage'}
        {#await fetchUser(channel.recipients[1]) then user}
          <ChannelComponent
            src={user.avatar === undefined
              ? generateDicebearAvatar()
              : getIconURL(user.avatar)
            }
            name={user.username}
            width="32"
            height="32"
            rounded
            id={channel._id}
          />
        {:catch}
          <ChannelComponent src={generateDicebearAvatar()} name="<Unknown User>" width="32" height="32" rounded id={channel._id} />
        {/await}
      {:else if channel.channel_type === 'TextChannel' || channel.channel_type === 'VoiceChannel' || channel.channel_type === 'Group'}
        <ChannelComponent
          src={channel.icon === undefined ? '/hashtag.svg' : getIconURL(channel.icon)}
          name={channel.name}
          width="24"
          height="24"
          id={channel._id}
        />
      {/if}
    {/if}
  {/each}
{/if}
