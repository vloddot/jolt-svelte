<script lang="ts">
	import { getContext } from '$lib/context';
	import { settingsKey } from '@routes/context';

	export let embed: Embed;

	const settings = getContext(settingsKey)!;
</script>

{#if embed.type == 'Image' && !$settings['jolt:low-data-mode']}
	<!-- svelte-ignore a11y-missing-attribute -->
	<img src={embed.url} width={embed.width} height={embed.height} />
{:else if embed.type == 'Video' && !$settings['jolt:low-data-mode']}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video controls>
		<source src={embed.url} width={embed.width} height={embed.height} />
	</video>
{:else if embed.type == 'Text'}
	<div class="text-embed" style="border-left: solid {embed.colour}">
		{#if embed.icon_url && !$settings['jolt:low-data-mode']}
			<img src={embed.icon_url} alt={embed.title} width="24" height="24" />
		{/if}

		{#if embed.title}
			<h1>{embed.title}</h1>
		{/if}

		{#if embed.description}
			<p>{embed.description}</p>
		{/if}
	</div>
{:else if embed.type == 'Website'}
	<span style="color: var(--secondary-foreground);">oop website embed, can't handle that :(</span>
{/if}

<style lang="scss">
	.text-embed {
		background-color: var(--primary-header);
		border-radius: var(--border-radius);
		padding: 12px;

		img {
			display: inline;
		}
	}
</style>
