<script lang="ts">
  import { settings } from '$lib/stores';

  /**
   * Source for avatar of member.
   */
  export let src: string;

  /**
   * Display name of member.
   */
  export let displayName: string;
</script>

<div role="listitem">
  {#if !$settings.lowDataMode}
    <img
      {src}
      alt={displayName}
      width="24"
      height="24"
      class="rounded-3xl inline aspect-square"
    />
  {/if}

  {displayName}
</div>
