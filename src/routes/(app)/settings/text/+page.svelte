<script lang="ts">
	import '$lib/index.css';
	import { getContext, settingsKey } from '$lib/context';

	interface DisplayedSetting {
		title: string;
		description?: string;
		key: keyof Settings;
	}

	const settings = getContext(settingsKey);

	const displayedSettings: DisplayedSetting[] = [
		{
			title: 'Low Data Mode',
			description: `Blocks media from sources other than the installed app on your system.
So media installed with the app are shown but not media from the internet.`,
			key: 'lowDataMode'
		}
	];
</script>

{#each displayedSettings as { key, title, description }}
	{@const setting = $settings?.[key]}
	<div class="flex ml-4">
		<div>
			<h2><label for={key}>{title}</label></h2>
			{#if description}
				<p class="ml-4 whitespace-pre-wrap">{description}</p>
			{/if}
		</div>
		<div class="flex-1">
			{#if typeof setting == 'boolean'}
				<input
					id={key}
					checked={setting}
					type="checkbox"
					on:input={(event) => {
						settings?.update((settings) => {
							settings[key] = event.currentTarget.checked;
							localStorage.setItem('settings', JSON.stringify(settings));
							return settings;
						});
					}}
				/>
			{/if}
		</div>
	</div>
{/each}
