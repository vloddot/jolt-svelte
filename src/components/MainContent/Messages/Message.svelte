<script lang="ts">
  import { bulkMessageInfoKey, repliesKey } from './sharedData';
  import { getAutumnURL, getDisplayAvatar } from '$lib/helpers';
  import { currentServerID, session } from '$lib/stores';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { Reply } from './sharedData';
  import dayjs from 'dayjs';
  import { decodeTime } from 'ulid';
  import { shell } from '@tauri-apps/api';

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
  $: displayAvatar = getDisplayAvatar(member, author);
</script>

<div role="listitem" class="group m-4">
  <div class="flex">
    <img
      alt={displayUsername}
      src={displayAvatar}
      width="40"
      height="40"
      class="rounded-3xl inline aspect-square"
    />

    {displayUsername}

    <time>
      {dayjs(decodeTime(message._id)).format('YYYY-MM-DD hh:mm')}
    </time>

    {#if message.edited !== undefined}
      <p class="text-gray-500">
        (edited at {dayjs(message.edited).format('YYYY-MM-DD hh:mm')})
      </p>
    {/if}

    <div class="flex-1" />

    <div class="hidden group-hover:block">
      {#each controls as { src, alt, onclick, showIf }}
        {#if showIf?.() ?? true}
          <button class="ml-2" aria-label={alt} on:click={onclick}>
            <img width="16" height="16" {src} {alt} />
          </button>
        {/if}
      {/each}
    </div>
  </div>

  {#if message.content}
    {message.content}
  {/if}

  {#if message.attachments}
    {#each message.attachments as attachment}
      <div>
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
          File <span class="text-gray-500">{attachment.filename}</span>
          <button on:click={() => shell.open(getAutumnURL(attachment))}>
            <img src="/download.svg" alt="Download" />
          </button>
        {:else if attachment.metadata.type === 'Text'}
          {#await fetch(getAutumnURL(attachment)) then response}
            {#await response.text() then text}
              <p>{text}</p>
            {/await}
          {:catch error}
            <p>Unable to download {attachment.filename}: {error}</p>
          {/await}
        {/if}
      </div>
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
