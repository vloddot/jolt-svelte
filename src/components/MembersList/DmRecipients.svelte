<script lang="ts">
  import MemberComponent from './MemberComponent.svelte';
  import { selectedChannelID } from '$lib/stores';
  import { fetchUser, getAutumnURL, getDefaultUserAvatar } from '$lib/util';
  import { invoke } from '@tauri-apps/api';
  let recipients: [User, User] | undefined;

  async function updateRecipients(channelId: string | null) {
    if (channelId !== null) {
      const channel = await invoke<Channel>('fetch_channel', { channelId });
      if (channel.channel_type === 'DirectMessage') {
        Promise.all(channel.recipients.map((recipient) => fetchUser(recipient))).then((users) => {
          recipients = users as [User, User];
        });
      }
    }
  }

  $: updateRecipients($selectedChannelID);
</script>

{#if recipients !== undefined}
  {#each recipients as recipient}
    <MemberComponent
      src={recipient.avatar === undefined
        ? getDefaultUserAvatar(recipient._id)
        : getAutumnURL(recipient.avatar)}
      displayName={recipient.username}
    />
  {/each}
{/if}
