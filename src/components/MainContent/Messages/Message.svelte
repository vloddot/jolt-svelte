<script lang="ts">
  import { bulkMessageInfoKey, repliesKey } from './sharedData';
  import { getAutumnURL, getDisplayAvatar } from '$lib/helpers';
  import { currentServerID, session, settings } from '$lib/stores';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { Reply } from './sharedData';
  import dayjs from 'dayjs';
  import { decodeTime } from 'ulid';
  import { _, time, date } from 'svelte-i18n';
  import ExternalLink from '$components/ExternalLink.svelte';

  /**
   * Message to show.
   */
  export let message: Message;

  const bulkMessageInfo = getContext<Writable<BulkMessagePayload>>(bulkMessageInfoKey);
  const replies = getContext<Writable<Reply[]>>(repliesKey);

  interface MessageControls {
    src: string;
    alt: string;
    showIf?: () => boolean;
    onclick: (event: MouseEvent) => unknown;
  }

  function pushReply() {
    if ($replies.some((reply) => reply.message._id === message._id)) {
      return;
    }

    replies.update((replies) => {
      replies.push({ message, mention: true });
      return replies;
    });
  }

  const controls: MessageControls[] = [
    {
      src: '/reply.svg',
      alt: $_('message.reply'),
      onclick: pushReply,
    },
    {
      src: '/edit.svg',
      alt: $_('message.edit'),
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

  $: displayUsername = member?.nickname ?? author?.username ?? `<${$_('user.unknown')}>`;
  $: displayAvatar = getDisplayAvatar(member, author);
</script>

<div class="group m-4">
  <div class="flex">
    {#if !$settings.lowDataMode}
      <img
        alt={displayUsername}
        src={displayAvatar}
        width="40"
        height="40"
        class="rounded-3xl inline aspect-square"
      />
    {/if}

    {displayUsername}

    <p class="text-gray-500">
      [{$time(dayjs(decodeTime(message._id)).toDate())}]

      {#if message.edited !== undefined}
        [{$_('message.edited-at')} {$date(dayjs(message.edited).toDate())}]
      {/if}
    </p>

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
    <span style="overflow-wrap: break-word;" class="whitespace-pre-wrap">{message.content}</span>
  {/if}

  {#if message.attachments}
    {#each message.attachments as attachment}
      <div>
        {#if attachment.metadata.type === 'Image'}
          {#if $settings.lowDataMode}
            <span class="text-gray-500"
              >[Image <ExternalLink link={getAutumnURL(attachment)} />]</span
            >
          {:else}
            <img src={getAutumnURL(attachment)} alt={attachment.filename} />
          {/if}
        {:else if attachment.metadata.type === 'Video'}
          <!-- svelte-ignore a11y-media-has-caption -->
          <video controls>
            <source src={getAutumnURL(attachment)} />
          </video>
        {:else if attachment.metadata.type === 'Audio'}
          <audio controls>
            <source src={getAutumnURL(attachment)} />
          </audio>
        {:else if attachment.metadata.type === 'File'}
          <span class="text-gray-500"
            >[File {attachment.filename}]
            <ExternalLink link={getAutumnURL(attachment)} /></span
          >
        {:else if attachment.metadata.type === 'Text'}
          {#if $settings.lowDataMode}
            <span class="text-gray-500"
              >[Text <ExternalLink link={getAutumnURL(attachment)} />]</span
            >
          {:else}
            {#await fetch(getAutumnURL(attachment)) then response}
              {#await response.text() then text}
                <p>{text}</p>
              {/await}
            {:catch error}
              <p>{$_('file.download.error')} {attachment.filename}: {error}</p>
            {/await}
          {/if}
        {/if}
      </div>
    {/each}
  {/if}

  {#if message.embeds}
    {#each message.embeds as embed}
      {#if $settings.lowDataMode}
        {#if embed.type !== 'None' && embed.url !== undefined}
          <ExternalLink link={embed.url} />
        {/if}
      {:else if embed.type === 'Image'}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={embed.url} width={embed.width} height={embed.height} />
      {:else if embed.type === 'Video'}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video controls>
          <source src={embed.url} width={embed.width} height={embed.height} />
        </video>
      {:else}
        <span class="text-gray-500">Embed for debugging {JSON.stringify(embed)}</span>
      {/if}
    {/each}
  {/if}
</div>
