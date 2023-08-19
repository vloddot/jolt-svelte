<script lang="ts">
	import { lowDataModeKey } from '@components/Chat';
	import ExternalLink from '@components/ExternalLink.svelte';
	import { getContext } from 'svelte';

	export let embed: Embed;

	const lowDataMode = getContext(lowDataModeKey);
</script>

{#if lowDataMode}
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
