<script lang="ts">
  import Icon from './Icon.svelte';
  import { servers } from '$lib/stores';
</script>

{#each $servers ?? [] as server}
  <Icon name={server.name} icon={server.icon} id={server._id} />
{/each}
