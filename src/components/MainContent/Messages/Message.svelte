<script lang="ts">
  import { key } from './messagePayload';
  import { getAutumnURL } from '$lib/helpers';
  import { currentServerID } from '$lib/stores';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  /**
   * Message to show.
   */
  export let message: Message;

  const messageQueryPayload = getContext<Writable<Required<BulkMessagePayload>>>(key);

  $: author = $messageQueryPayload.users.find((user) => user._id === message.author);
  $: member = $messageQueryPayload.members?.find(
    (member) => member._id.server === $currentServerID && member._id.user === author?._id
  );

  $: displayUsername = member?.nickname ?? author?.username ?? '<Unknown User>';
  $: displayAvatar = member?.avatar ?? author?.avatar;
</script>

<img
  alt={displayUsername}
  src={displayAvatar === undefined ? '/user.svg' : getAutumnURL(displayAvatar)}
  width="24"
  height="24"
  class="rounded-3xl inline"
/>
{displayUsername}

{message.content}

{#if message.attachments}
  {#each message.attachments as attachment}
    {#if attachment.content_type.startsWith('image')}
      <img src={getAutumnURL(attachment)} alt={attachment.filename} />
    {:else if attachment.content_type.startsWith('video')}
      <video controls>
        <source src={getAutumnURL(attachment)} type={attachment.content_type} />
        <track kind="captions" />
      </video>
    {/if}
  {/each}
{/if}
