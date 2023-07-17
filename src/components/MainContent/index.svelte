<script>
  import Home from "./Home.svelte";
  import Server from "./Server.svelte";
  import { currentServerIndex } from "$lib/stores";

</script>

{#if $currentServerIndex === null}
  <Home />
{:else}
  <Server index={$currentServerIndex} />
{/if}
