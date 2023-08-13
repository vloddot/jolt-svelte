<script lang="ts">
  import Icon from './Icon.svelte';
  import { currentServerID, servers, pageToShow } from '$lib/stores';
  import { getAutumnURL } from '$lib/util';
</script>

{#each $servers ?? [] as server}
  <Icon
    tooltip={server.name}
    icon={server.icon === undefined ? undefined : getAutumnURL(server.icon)}
    on:click={() => currentServerID.set(server._id)}
    on:keydown={(event) => event.key === 'Enter' && currentServerID.set(server._id)}
  />
{/each}

<!-- Any icons under here should set `forceShowIcon` because they're meant to be installed with the app. -->

<div class="flex-1" />

<Icon
  tooltip="Settings"
  icon="/gears.svg"
  forceShowIcon
  on:click={() => pageToShow.set('settings')}
  on:keydown={(event) => event.key === 'Enter' && pageToShow.set('settings')}
/>
