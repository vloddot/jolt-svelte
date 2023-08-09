<script lang="ts">
  import { event, invoke } from '@tauri-apps/api';
  import MessageComponent from './Message.svelte';
  import { onMount, setContext } from 'svelte';
  import { bulkMessageInfoKey, repliesKey } from './sharedData';
  import { writable } from 'svelte/store';
  import type { Reply } from './sharedData';

  /**
   * Which channel to show messages from.
   */
  export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

  const bulkMessagesInfo = writable<BulkMessagePayload>({
    members: [],
    messages: [],
    users: [],
  });

  const replies = writable<Reply[]>([]);

  // `bulkMessageInfo` contains info about users and members that are helpful.
  setContext(bulkMessageInfoKey, bulkMessagesInfo);

  // `replies` contains the current user's replies that will be sent.
  setContext(repliesKey, replies);

  let messageInputNode: HTMLTextAreaElement;

  $: {
    invoke<BulkMessagePayload>('fetch_messages', { channelId: channel._id }).then((response) =>
      bulkMessagesInfo.set(response)
    );
    replies.set([]);
  }

  onMount(() => {
    event.listen<Message>('message', ({ payload: message }) => {
      if (message.channel === channel._id) {
        bulkMessagesInfo.set({
          ...$bulkMessagesInfo,
          messages: [
            message,
            ...(Array.isArray($bulkMessagesInfo)
              ? $bulkMessagesInfo
              : $bulkMessagesInfo.messages ?? []),
          ],
        });
      }
    });

    // event.listen<ChannelTypingPayload>(
    //   'channel_start_typing',
    //   ({ payload: { channel_id, user_id } }) => {
    //     if (user_id !== $session?.user_id && channel_id === channel._id) {
    //       usersTyping = [...usersTyping, user_id];
    //     }
    //   }
    // );

    // event.listen<ChannelTypingPayload>(
    //   'channel_stop_typing',
    //   ({ payload: { channel_id, user_id } }) => {
    //     if (user_id !== $session?.user_id) {
    //       if (channel_id === channel._id) {
    //         usersTyping = usersTyping.filter((id) => user_id !== id);
    //       }
    //     }
    //   }
    // );
  });

  async function sendMessage() {
    const dataMessageSend: DataMessageSend = {
      content: messageInputNode.value.trim(),
      replies: $replies.map(({ message: { _id }, mention }) => ({
        id: _id,
        mention,
      })),
    };

    replies.set([]);
    messageInputNode.value = '';

    await invoke<Message>('send_message', { channelId: channel._id, dataMessageSend });
  }

  async function startTyping() {
    invoke('start_typing', { channelId: channel._id });
  }
</script>

{#if $bulkMessagesInfo !== undefined}
  <div class="flex flex-col h-full overflow-x-hidden overflow-y-scroll">
    {#each [...(Array.isArray($bulkMessagesInfo) ? $bulkMessagesInfo : $bulkMessagesInfo.messages ?? [])].reverse() as message}
      <div class="hover:bg-gray-800">
        <MessageComponent {message} />
      </div>
    {/each}
    {#each $replies as reply}
      replying to
      {#if Array.isArray($bulkMessagesInfo)}
        {reply.message._id}
      {:else}
        {$bulkMessagesInfo.users?.find(({ _id }) => _id === reply.message.author)?._id ??
          '<Unknown User>'}
      {/if}
      {#if reply.mention}
        with mention
      {/if}
    {/each}
    <form on:submit|preventDefault={sendMessage}>
      <textarea
        on:input={startTyping}
        on:keydown={(event) => {
          if (event.shiftKey || event.key !== 'Enter') {
            return;
          }

          event.preventDefault();
          return sendMessage();
        }}
        bind:this={messageInputNode}
        class="resize-none rounded-xl bg-gray-500 w-full"
      />

      <button type="submit">Send</button>
    </form>
  </div>
{/if}
