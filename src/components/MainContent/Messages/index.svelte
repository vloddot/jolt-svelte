<script lang="ts">
  import { event, invoke } from '@tauri-apps/api';
  import MessageComponent from './Message.svelte';
  import { onMount } from 'svelte';

  export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

  let messageQueryPayload: BulkMessagePayload = {
    members: [],
    messages: [],
    users: [],
  };

  let messageInputNode: HTMLInputElement;
  let messageInput: string;

  $: invoke<BulkMessagePayload>('fetch_messages', { channel: channel._id }).then((response) => {
    messageQueryPayload = response;
  });

  onMount(async () => {
    event.listen<Message>('message', ({ payload: message }) => {
      if (message.channel === channel._id) {
        messageQueryPayload.messages = [message, ...(messageQueryPayload.messages ?? [])];
      }
    });
  });

  async function sendMessage() {
    messageInputNode.value = '';
    messageQueryPayload.messages = [
      await invoke<Message>('send_message', { channel: channel._id, content: messageInput }),
      ...(messageQueryPayload.messages ?? []),
    ];
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

<form on:submit|preventDefault={sendMessage}>
  <input bind:value={messageInput} bind:this={messageInputNode} class="bg-gray-500" />
</form>
