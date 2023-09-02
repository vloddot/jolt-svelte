<script lang="ts">
	import { getContext } from '$lib/context';
	import { settingsKey } from '@routes/context';

	export let title: string;
	export let description: string | undefined = undefined;
	export let key: keyof Settings;

	const settings = getContext(settingsKey)!;

	$: value = $settings[key];
</script>

<div class="flex ml-4">
	<div>
		<h2><label for={key}>{title}</label></h2>
		{#if description}
			<p class="ml-4 whitespace-pre-wrap">{description}</p>
		{/if}
	</div>
	<div class="flex-1">
		{#if typeof value == 'boolean'}
			<input
				id={key}
				checked={value}
				type="checkbox"
				on:input={(event) => {
					settings?.update((settings) => {
						settings[key] = event.currentTarget.checked;
						return settings;
					});
				}}
			/>
		{/if}
	</div>
</div>
