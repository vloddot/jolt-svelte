<script lang="ts">
  import { settings } from '$lib/stores';
  import './index.css';

  /**
   * Tooltip for icon.
   */

  export let tooltip: string;

  /**
   * Icon to show.
   */
  export let icon: string | undefined;

  /**
   * Force to show icon (unless `icon` is `undefined`), ignoring low data mode.
   */
  export let forceShowIcon = false;
</script>

<div class="group m-0">
  <span class="sidebar-tooltip group-hover:scale-100">
    {tooltip}
  </span>
  <span tabindex="0" role="link" aria-label={tooltip} on:click on:keydown>
    {#if icon !== undefined && !$settings.lowDataMode || forceShowIcon}
      <img
        class="sidebar-icon group-hover:rounded-xl group-hover:bg-green-600 group-hover:text-white"
        src={icon}
        alt={tooltip}
      />
    {:else}
      <span
        class="sidebar-icon group-hover:rounded-xl group-hover:bg-green-600 group-hover:text-white"
        >{tooltip
          .split(' ')
          .slice(0, 2)
          .map((s) => s[0])
          .join('')}
      </span>
    {/if}
  </span>
</div>
