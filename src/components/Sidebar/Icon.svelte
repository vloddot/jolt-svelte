<script lang="ts">
  import { getAutumnURL } from '$lib/helpers';
  import { currentServerID } from '$lib/stores';
  import './index.css';

  /**
   * Tooltip for icon.
   */

  export let tooltip: string;

  /**
   * Icon to show.
   */
  export let icon: AutumnFile | undefined;

  /**
   * Item ID.
   */
  export let id: string;
</script>

<div class="group m-0">
  <span class="sidebar-tooltip group-hover:scale-100">
    {tooltip}
  </span>
  <span
    tabindex="0"
    role="link"
    aria-label={tooltip}
    on:click={() => currentServerID.set(id)}
    on:keydown={(event) => event.key === 'Enter' && currentServerID.set(id)}
  >
    {#if icon === undefined}
      <span
        class="sidebar-icon group-hover:rounded-xl group-hover:bg-green-600 group-hover:text-white"
        >{tooltip
          .split(' ')
          .slice(0, 2)
          .map((s) => s[0])
          .join('')}
      </span>
    {:else}
      <img
        class="sidebar-icon group-hover:rounded-xl group-hover:bg-green-600 group-hover:text-white"
        src={getAutumnURL(icon)}
        alt={tooltip}
      />
    {/if}
  </span>
</div>
