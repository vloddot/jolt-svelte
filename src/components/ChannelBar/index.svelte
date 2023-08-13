<script lang="ts">
  import { currentServerID } from '$lib/stores';
  import ServerChannels from './ServerChannels.svelte';
  import DirectMessages from './DirectMessages.svelte';
</script>

{#if $currentServerID === null}
  <DirectMessages />
{:else}
  <ServerChannels />
{/if}
