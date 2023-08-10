<script lang="ts">
  import ChannelItem from '$components/ChannelBar/ChannelItem.svelte';
  import { fetchUser, getAutumnURL, getDefaultUserAvatar } from '$lib/helpers';
  import { session } from '$lib/stores';

  function getChannelIcon({
    icon,
    channel_type,
  }: Exclude<Channel, { channel_type: 'DirectMessage' | 'SavedMessages' }>): string {
    if (icon !== undefined) {
      return getAutumnURL(icon);
    }

    switch (channel_type) {
      case 'Group':
        return '/group.svg';
      case 'TextChannel':
        return '/hash.svg';
      case 'VoiceChannel':
        return '/volume.svg';
    }
  }

  export let channel: Channel;
</script>

{#if channel.channel_type === 'DirectMessage'}
  {#await fetchUser(channel.recipients[0] === $session?.user_id ? channel.recipients[1] : channel.recipients[0]) then user}
    <ChannelItem
      src={user.avatar === undefined ? getDefaultUserAvatar(user._id) : getAutumnURL(user.avatar)}
      name={user.username}
      width={32}
      height={32}
      rounded
      id={channel._id}
    />
  {:catch}
    <ChannelItem
      src="/user.svg"
      name="<Unknown User>"
      alt="Unknown User"
      width={32}
      height={32}
      rounded
      id={channel._id}
    />
  {/await}
{:else if channel.channel_type === 'TextChannel' || channel.channel_type === 'VoiceChannel' || channel.channel_type === 'Group'}
  <ChannelItem
    src={getChannelIcon(channel)}
    name={channel.name}
    width={24}
    height={24}
    id={channel._id}
  />
{/if}
