<script lang="ts">
  import { event, invoke } from '@tauri-apps/api';
  import MessageComponent from './Message.svelte';
  import { onMount } from 'svelte';
  import { fetchUser } from '$lib/helpers';
  import { session } from '$lib/stores';

  export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

  let messageQueryPayload: BulkMessagePayload = {
    members: [],
    messages: [],
    users: [],
  };

  let messageInputNode: HTMLInputElement;
  let messageInput: string;

  let usersTyping: User[] = [];

  $: invoke<BulkMessagePayload>('fetch_messages', { channel: channel._id }).then((response) => {
    messageQueryPayload = response;
  });

  onMount(async () => {
    event.listen<Message>('message', ({ payload: message }) => {
      if (message.channel === channel._id) {
        messageQueryPayload.messages = [message, ...(messageQueryPayload.messages ?? [])];
      }
    });

    event.listen<ChannelTypingPayload>(
      'channel_start_typing',
      async ({ payload: { channel_id, user_id } }) => {
        if (user_id !== $session?.user_id) {
          if (channel_id === channel._id) {
            usersTyping = [...usersTyping, await fetchUser(user_id)];
          }
        }
      }
    );

    event.listen<ChannelTypingPayload>(
      'channel_stop_typing',
      ({ payload: { channel_id, user_id } }) => {
        if (user_id !== $session?.user_id) {
          if (channel_id === channel._id) {
            usersTyping = usersTyping.filter(({ _id }) => user_id !== _id);
          }
        }
      }
    );
  });

  async function sendMessage() {
    messageInputNode.value = '';
    messageQueryPayload.messages = [
      await invoke<Message>('send_message', { channel: channel._id, content: messageInput }),
      ...(messageQueryPayload.messages ?? []),
    ];
  }

  async function startTyping() {
    invoke('start_typing', { channel: channel._id });
  }
</script>

{#if messageQueryPayload !== undefined}
  <div class="flex flex-col-reverse h-full overflow-x-hidden overflow-y-scroll">
    {#each messageQueryPayload.messages ?? [] as message}
      <div class="hover:bg-gray-800">
        <MessageComponent
          users={messageQueryPayload.users ?? []}
          members={messageQueryPayload.members ?? []}
          {message}
        />
      </div>
    {/each}
  </div>
{/if}

{#each usersTyping as user}
  {user.username} is typing.
{/each}
<form on:submit|preventDefault={sendMessage}>
  <input
    bind:value={messageInput}
    on:input={startTyping}
    bind:this={messageInputNode}
    class="bg-gray-500"
  />
</form>
