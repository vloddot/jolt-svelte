<script lang="ts">
  import { event, invoke } from '@tauri-apps/api';
  import MessageComponent from './Message.svelte';
  import { onMount, setContext } from 'svelte';
  import { bulkMessageInfoKey, repliesKey } from './sharedData';
  import { writable } from 'svelte/store';
  import type { Reply } from './sharedData';
  import { currentChannelID, session } from '$lib/stores';
  import { fetchUser, getAutumnURL, getDefaultUserAvatar } from '$lib/helpers';

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
  let currentlyTypingUsers: User[];

  $: {
    invoke<BulkMessagePayload>('fetch_messages', { channelId: channel._id }).then((response) =>
      bulkMessagesInfo.set(response)
    );

    replies.set([]);
    currentlyTypingUsers = [];
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

    event.listen<ChannelTypingPayload>(
      'channel_start_typing',
      async ({ payload: { user_id, channel_id } }) => {
        if (
          user_id === $session?.user_id ||
          channel_id !== $currentChannelID ||
          currentlyTypingUsers.map((user) => user._id).includes(user_id)
        ) {
          return;
        }

        currentlyTypingUsers = [...currentlyTypingUsers, await fetchUser(user_id)];
      }
    );

    event.listen<ChannelTypingPayload>(
      'channel_stop_typing',
      ({ payload: { user_id, channel_id } }) => {
        if (channel_id === $currentChannelID) {
          currentlyTypingUsers = currentlyTypingUsers.filter((user) => user._id !== user_id);
        }
      }
    );
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
</script>

{#if $bulkMessagesInfo !== undefined}
  <div class="flex flex-col h-full overflow-x-hidden overflow-y-scroll">
    {#each [...(Array.isArray($bulkMessagesInfo) ? $bulkMessagesInfo : $bulkMessagesInfo.messages ?? [])].reverse() as message}
      <div class="hover:bg-gray-800">
        <MessageComponent {message} />
      </div>
    {/each}
    {#each currentlyTypingUsers as user}
      <div>
        <img
          src={user.avatar === undefined
            ? getDefaultUserAvatar(user._id)
            : getAutumnURL(user.avatar)}
          class="inline aspect-square rounded-3xl"
          width="16"
          height="16"
          alt={user.username}
        />
        {user.username} is typing...
      </div>
    {/each}
    {#if $replies.length !== 0}
      replying to
    {/if}
    {#each $replies as reply}
      <div>
        {#await fetchUser(reply.message.author) then user}
          <strong>{user.username}</strong>
        {/await}
        <p>{reply.message.content}</p>
      </div>
    {/each}
    <form class="m-4" on:submit|preventDefault={sendMessage}>
      <textarea
        on:input={() => invoke('start_typing', { channelId: channel._id })}
        on:keydown={(event) => {
          if (event.shiftKey || event.key !== 'Enter') {
            return;
          }

          event.preventDefault();
          sendMessage();
        }}
        bind:this={messageInputNode}
        class="resize-none rounded-xl bg-gray-500 w-full"
      />
    </form>
  </div>
{/if}
