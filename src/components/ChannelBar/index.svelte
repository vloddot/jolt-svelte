<script lang="ts">
  import ChannelComponent from './Channel.svelte';
  import { channels as channelStore, currentServerID, servers, session } from '$lib/stores';
  import { fetchUser, generateDicebearAvatar, getAutumnURL } from '$lib/helpers';

  function channelIcon(
    channel: Exclude<Channel, { channel_type: 'DirectMessage' | 'SavedMessages' }>
  ): string {
    if (channel.icon !== undefined) {
      return getAutumnURL(channel.icon);
    }

    switch (channel.channel_type) {
      case 'Group':
        return '/group.svg';
      case 'TextChannel':
        return '/hashtag.svg';
      case 'VoiceChannel':
        return '/headset.svg';
    }
  }

  $: channels =
    $currentServerID === null
      ? $channelStore?.filter(
          (channel) => channel.channel_type === 'DirectMessage' && channel.active
        )
      : $servers
          ?.find(({ _id }) => _id === $currentServerID)
          ?.channels.map((id) => $channelStore?.find((channel) => channel._id === id));
</script>

{#if channels !== undefined}
  {#each channels as channel}
    {#if channel !== undefined}
      {#if channel.channel_type === 'DirectMessage'}
        {#await fetchUser(channel.recipients[0] === $session?.user_id ? channel.recipients[1] : channel.recipients[0]) then user}
          <ChannelComponent
            src={user.avatar === undefined
              ? generateDicebearAvatar()
              : getAutumnURL(user.avatar)}
            name={user.username}
            width="32"
            height="32"
            rounded
            id={channel._id}
          />
        {:catch}
          <ChannelComponent
            src={generateDicebearAvatar()}
            name="<Unknown User>"
            alt="Unknown User"
            width="32"
            height="32"
            rounded
            id={channel._id}
          />
        {/await}
      {:else if channel.channel_type === 'TextChannel' || channel.channel_type === 'VoiceChannel' || channel.channel_type === 'Group'}
        <ChannelComponent
          src={channelIcon(channel)}
          name={channel.name}
          width="24"
          height="24"
          id={channel._id}
        />
      {/if}
    {/if}
  {/each}
{/if}
