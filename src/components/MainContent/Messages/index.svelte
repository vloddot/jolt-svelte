<script lang="ts">
  import { invoke } from '@tauri-apps/api';
  import MessageComponent from './Message.svelte';
  import { onMount } from 'svelte';

  export let channel: Exclude<Channel, { channel_type: 'VoiceChannel' }>;

  let messages: Message[] = [];
  let messageInputNode: HTMLInputElement;
  let messageInput: string;

  onMount(async () => {
    messages = (await invoke<BulkMessageResponse>('fetch_messages', { channel: channel._id }))
      .messages;
  });

  async function sendMessage() {
    messages = [
      await invoke<Message>('send_message', { channel: channel._id, content: messageInput }),
      ...messages,
    ];
    messageInputNode.value = '';
  }
</script>

<div class="flex flex-col-reverse flex-grow min-h-0 overflow-x-hidden overflow-y-scroll h-full">
  {#each messages as message}
    <div class="hover:bg-gray-800">
      <MessageComponent {message} />
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage}>
  <input bind:value={messageInput} bind:this={messageInputNode} />
</form>
