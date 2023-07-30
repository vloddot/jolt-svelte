<script lang="ts">
  import { event, invoke } from '@tauri-apps/api';
  import MessageComponent from './Message.svelte';
  import { onMount, setContext } from 'svelte';
  import { session } from '$lib/stores';
  import { key } from './messagePayload';
  import { writable } from 'svelte/store';

  /**
   * Which channel to show messages from.
   */
  export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

  let messageQueryPayload = writable<BulkMessagePayload>({
    members: [],
    messages: [],
    users: [],
  });

  // `messageQueryPayload` contains info about users and members that are helpful.
  setContext(key, messageQueryPayload);

  let messageInputNode: HTMLInputElement;
  let messageInput: string;

  // let usersTyping: string[] = [];

  $: invoke<BulkMessagePayload>('fetch_messages', { channel: channel._id }).then((response) => {
    messageQueryPayload.set(response);
  });

  onMount(async () => {
    event.listen<Message>('message', ({ payload: message }) => {
      if (message.channel === channel._id) {
        messageQueryPayload.set({
          ...$messageQueryPayload,
          messages: [...($messageQueryPayload.messages ?? []), message],
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
    messageInputNode.value = '';
    await invoke<Message>('send_message', { channel: channel._id, content: messageInput });
  }

  async function startTyping() {
    invoke('start_typing', { channel: channel._id });
  }
</script>

{#if $messageQueryPayload !== undefined}
  <div class="flex flex-col h-full overflow-x-hidden overflow-y-scroll">
    {#each [...($messageQueryPayload.messages ?? [])].reverse() as message}
      <div class="hover:bg-gray-800">
        <MessageComponent {message} />
      </div>
    {/each}
  </div>
{/if}

<!-- {#each usersTyping as user}
  {user} is typing.
{/each} -->
<form on:submit|preventDefault={sendMessage}>
  <input
    bind:value={messageInput}
    on:input={startTyping}
    bind:this={messageInputNode}
    class="bg-gray-500"
  />
</form>
