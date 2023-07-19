<script>
    import { currentServerID } from '$lib/stores';
    import Messages from './Messages.svelte';

</script>

{#if $currentServerID !== null}
  <Messages />
{/if}
