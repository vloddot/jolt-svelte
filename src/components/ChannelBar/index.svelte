<script lang="ts">
  import { selectedServerID } from '$lib/stores';
  import ServerChannels from './ServerChannels.svelte';
  import DirectMessages from './DirectMessages.svelte';
</script>

{#if $selectedServerID === null}
  <DirectMessages />
{:else}
  <ServerChannels />
{/if}
