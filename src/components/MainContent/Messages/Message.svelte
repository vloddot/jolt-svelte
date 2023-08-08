<script lang="ts">
  import { bulkMessageInfoKey, repliesKey } from './sharedData';
  import { getAutumnURL } from '$lib/helpers';
  import { currentServerID, session } from '$lib/stores';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { Reply } from './sharedData';

  /**
   * Message to show.
   */
  export let message: Message;

  const bulkMessageInfo = getContext<Writable<BulkMessagePayload>>(bulkMessageInfoKey);
  const replies = getContext<Writable<Reply[]>>(repliesKey);

  interface Controls {
    src: string;
    alt: string;
    showIf?: () => boolean;
    onclick: (event: MouseEvent) => unknown;
  }

  function pushReply(_: MouseEvent) {
    if ($replies.some((reply) => reply.message._id === message._id)) {
      return;
    }

    replies.set([...$replies, { message, mention: true }]);
  }

  const controls: Controls[] = [
    {
      src: '/reply.svg',
      alt: 'Reply',
      onclick: pushReply,
    },
    {
      src: '/edit.svg',
      alt: 'Edit',
      onclick() {},
      showIf: () => message.author === $session?.user_id,
    },
  ];

  $: author = !Array.isArray($bulkMessageInfo)
    ? $bulkMessageInfo.users?.find((user) => user._id === message.author)
    : undefined;

  $: member = !Array.isArray($bulkMessageInfo)
    ? $bulkMessageInfo.members?.find(
        (member) => member._id.server === $currentServerID && member._id.user === author?._id
      )
    : undefined;

  $: displayUsername = member?.nickname ?? author?.username ?? '<Unknown User>';
  $: displayAvatar = member?.avatar ?? author?.avatar;
</script>

<div role="listitem" class="group m-4">
  <div class="flex">
    <img
      alt={`${displayUsername}'s avatar'`}
      src={displayAvatar === undefined ? '/user.svg' : getAutumnURL(displayAvatar)}
      width="24"
      height="24"
      class="rounded-3xl inline"
    />

    {displayUsername}
    {#if message.edited}
      <span class="text-gray-500">(edited)</span>
    {/if}

    <div class="flex-1" />

    <span class="hidden group-hover:block">
      {#each controls as { src, alt, onclick, showIf }}
        {#if showIf?.() ?? true}
          <button class="ml-2" aria-label={alt} on:click={onclick}>
            <img width="16" height="16" {src} {alt} />
          </button>
        {/if}
      {/each}
    </span>
  </div>

  {#if message.content}
    {message.content}
  {/if}

  {#if message.attachments}
    {#each message.attachments as attachment}
      {#if attachment.metadata.type === 'Image'}
        <img src={getAutumnURL(attachment)} alt={attachment.filename} />
      {:else if attachment.metadata.type === 'Video'}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video controls>
          <source src={getAutumnURL(attachment)} />
        </video>
      {:else if attachment.metadata.type === 'Audio'}
        <audio controls>
          <source src={getAutumnURL(attachment)} />
          Your browser does not support the &lt;audio&gt; element.
        </audio>
      {:else if attachment.metadata.type === 'File'}
        File ({attachment.filename})
      {:else if attachment.metadata.type === 'Text'}
        {#await fetch(getAutumnURL(attachment)) then response}
          {#await response.text() then text}
            {text}
          {/await}
        {:catch error}
          Unable to download {attachment.filename}: {error}
        {/await}
      {/if}
    {/each}
  {/if}

  {#if message.embeds}
    {#each message.embeds as embed}
      {#if embed.type === 'Website'}
        {#if embed.special}
          {console.log(embed.special)}
        {/if}
      {:else if embed.type === 'Image'}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={embed.url} width={embed.width} height={embed.height} />
      {:else if embed.type === 'Video'}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video controls>
          <source src={embed.url} width={embed.width} height={embed.height} />
          Your browser does not support the &lt;video&gt; element.
        </video>
      {:else}
        Hewwo, {JSON.stringify(embed)}
      {/if}
    {/each}
  {/if}
</div>
