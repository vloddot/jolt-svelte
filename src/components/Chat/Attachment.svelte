<script lang="ts">
	import { getContext } from '$lib/context';
	import { getAutumnURL } from '$lib/util';
	import ExternalLink from '@components/ExternalLink.svelte';
	import { settingsKey } from '@routes/context';

	const settings = getContext(settingsKey)!;

	export let attachment: AutumnFile;
	$: href = getAutumnURL(attachment);
</script>

<div>
	{#if attachment.metadata.type == 'Image'}
		{#if $settings['jolt:low-data-mode']}
			<span class="text-gray-500">[Image <ExternalLink {href} />]</span>
		{:else}
			<img src={href} alt={attachment.filename} class="max-w-xl max-h-xl" />
		{/if}
	{:else if attachment.metadata.type == 'Video'}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video controls>
			<source src={href} />
		</video>
	{:else if attachment.metadata.type == 'Audio'}
		<audio controls>
			<source src={href} />
		</audio>
	{:else if attachment.metadata.type == 'File'}
		<span class="text-gray-500">
			[File {attachment.filename}]
			<ExternalLink {href} />
		</span>
	{:else if attachment.metadata.type == 'Text'}
		{#if $settings['jolt:low-data-mode']}
			<span class="text-gray-500">[Text <ExternalLink {href} />]</span>
		{:else}
			{#await fetch(href) then response}
				{#await response.text() then text}
					<p>{text}</p>
				{/await}
			{:catch error}
				<p>Unable to download {attachment.filename}: {error}</p>
			{/await}
		{/if}
	{/if}
</div>

<style lang="scss">
	img,
	video {
		max-width: 400px;
		max-height: 300px;
	}
</style>
