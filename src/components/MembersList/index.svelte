<script lang="ts">
  import ServerMembers from './ServerMembers.svelte';
  import DmRecipients from './DmRecipients.svelte';
  import { selectedServerID } from '$lib/stores';
</script>

{#if $selectedServerID === null}
  <DmRecipients />
{:else}
  <ServerMembers />
{/if}
