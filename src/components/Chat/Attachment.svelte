<script lang="ts">
	import { getContext } from '$lib/context';
	import { settingsKey } from '@routes/context';
	import { getAutumnURL } from '$lib/util';
	import ExternalLink from '@components/ExternalLink.svelte';
	import { _ } from 'svelte-i18n';

	const settings = getContext(settingsKey)!;

	export let attachment: AutumnFile;
</script>

<div>
	{#if attachment.metadata.type == 'Image'}
		{#if $settings['jolt:low-data-mode']}
			<span class="text-gray-500">[Image <ExternalLink href={getAutumnURL(attachment)} />]</span>
		{:else}
			<img src={getAutumnURL(attachment)} alt={attachment.filename} />
		{/if}
	{:else if attachment.metadata.type == 'Video'}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video controls>
			<source src={getAutumnURL(attachment)} />
		</video>
	{:else if attachment.metadata.type == 'Audio'}
		<audio controls>
			<source src={getAutumnURL(attachment)} />
		</audio>
	{:else if attachment.metadata.type == 'File'}
		<span class="text-gray-500">
			[File {attachment.filename}]
			<ExternalLink href={getAutumnURL(attachment)} />
		</span>
	{:else if attachment.metadata.type == 'Text'}
		{#if $settings['jolt:low-data-mode']}
			<span class="text-gray-500">[Text <ExternalLink href={getAutumnURL(attachment)} />]</span>
		{:else}
			{#await fetch(getAutumnURL(attachment)) then response}
				{#await response.text() then text}
					<p>{text}</p>
				{/await}
			{:catch error}
				<p>{$_('file.download.error')} {attachment.filename}: {error}</p>
			{/await}
		{/if}
	{/if}
</div>
