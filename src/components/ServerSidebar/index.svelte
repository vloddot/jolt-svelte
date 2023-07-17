<script lang="ts">
  import Icon from './Icon.svelte';
  import { currentServerIndex, servers } from '$lib/stores';
  import './index.css';
</script>

<div class="sidebar">
  {#each $servers ?? [] as server, index}
    <Icon name={server.name} icon={server.icon} on:click={() => currentServerIndex.set(index)} on:keydown={(event) => event.key === 'Enter' && currentServerIndex.set(index)} />
  {/each}
</div>
