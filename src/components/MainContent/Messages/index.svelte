<script lang="ts">
  import { event, invoke } from '@tauri-apps/api';
  import MessageComponent from './Message.svelte';
  import { onMount, setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { type Reply, usersKey, membersKey, repliesKey } from './sharedData';
  import { selectedChannelID, session } from '$lib/stores';
  import { fetchUser, getAutumnURL, getDefaultUserAvatar } from '$lib/util';
  import { _ } from 'svelte-i18n';
  import { getChannelName } from '$lib/util';

  /**
   * Which channel to show messages from.
   */
  export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

  let messages: Message[] = [];
  let members: Writable<Member[]> = writable([]);
  let users: Writable<User[]> = writable([]);

  const replies = writable<Reply[]>([]);

  setContext(usersKey, users);
  setContext(membersKey, members);

  // `replies` contains the current user's replies that will be sent.
  setContext(repliesKey, replies);

  let messageInputNode: HTMLTextAreaElement;
  let currentlyTypingUsers: User[];

  $: {
    invoke<BulkMessagePayload>('fetch_messages', { channelId: channel._id }).then((response) => {
      if (Array.isArray(response)) {
        messages = response;
      } else {
        messages = response.messages ?? [];
        members.set(response.members ?? []);
        users.set(response.users ?? []);
      }
    });

    replies.set([]);
    currentlyTypingUsers = [];
  }

  onMount(() => {
    event.listen<Message>('message', ({ payload: message }) => {
      if (message.channel === channel._id) {
        messages = [message, ...messages];
      }
    });

    event.listen<ChannelTypingPayload>(
      'channel_start_typing',
      async ({ payload: { user_id, channel_id } }) => {
        if (
          user_id === $session?.user_id ||
          channel_id !== $selectedChannelID ||
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
        if (channel_id === $selectedChannelID) {
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

<div class="flex flex-col h-full overflow-x-hidden overflow-y-scroll">
  {#each [...messages].reverse() as message}
    <div class="hover:bg-gray-800">
      <MessageComponent {message} />
    </div>
  {/each}
  {#each currentlyTypingUsers as user}
    <div>
      <img
        src={user.avatar === undefined ? getDefaultUserAvatar(user._id) : getAutumnURL(user.avatar)}
        class="inline aspect-square rounded-3xl"
        width="16"
        height="16"
        alt={user.username}
      />
      {user.username}
      {$_('user.is-typing')}...
    </div>
  {/each}
  {#if $replies.length !== 0}
    {$_('message.replying-to')}
  {/if}
  {#each $replies as reply}
    <div>
      {#await fetchUser(reply.message.author) then user}
        <strong>{user.username}</strong>
      {/await}
      <p>{reply.message.content?.slice(0, 50)}</p>
    </div>
  {/each}
  <form class="m-4" on:submit|preventDefault={sendMessage}>
    {#await getChannelName(channel) then name}
      <div class="bg-gray-500 rounded-xl px-2 pt-2">
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
          class="outline-none resize-none bg-inherit w-full"
          placeholder={`${$_('send-message-in')} ${name}`}
        />
      </div>
    {/await}
  </form>
</div>
