<script lang="ts">
  import Icon from './Icon.svelte';
  import { currentServerID, servers, pageToShow } from '$lib/stores';
  import { getAutumnURL } from '$lib/helpers';
</script>

{#each $servers ?? [] as server}
  <Icon
    tooltip={server.name}
    icon={server.icon === undefined ? undefined : getAutumnURL(server.icon)}
    on:click={() => currentServerID.set(server._id)}
    on:keydown={(event) => event.key === 'Enter' && currentServerID.set(server._id)}
  />
{/each}

<div class="flex-1" />

<!-- Any icons under here should set `forceShowIcon` because they're meant to be installed with the app. -->

<Icon
  tooltip="Settings"
  icon="/gears.svg"
  forceShowIcon
  on:click={() => pageToShow.set('settings')}
  on:keydown={(event) => event.key === 'Enter' && pageToShow.set('settings')}
/>
