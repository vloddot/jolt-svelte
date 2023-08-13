<script lang="ts">
  import ExternalLink from "$components/ExternalLink.svelte";
  import { settings } from "$lib/stores";

  export let embed: Embed;
</script>

{#if $settings.lowDataMode}
  {#if embed.type !== 'None' && embed.url !== undefined}
    <ExternalLink link={embed.url} />
  {/if}
{:else if embed.type === 'Image'}
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src={embed.url} width={embed.width} height={embed.height} />
{:else if embed.type === 'Video'}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video controls>
    <source src={embed.url} width={embed.width} height={embed.height} />
  </video>
{:else}
  <span class="text-gray-500">Embed for debugging {JSON.stringify(embed)}</span>
{/if}
