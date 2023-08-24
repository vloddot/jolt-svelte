<script lang="ts">
	import '$lib/index.css';
	import { getContext, settingsContext } from '$lib/context';

	interface DisplayedSetting {
		title: string;
		description?: string;
		key: keyof Settings;
	}

	const settings = getContext(settingsContext);

	const displayedSettings: DisplayedSetting[] = [
		{
			title: 'Low Data Mode',
			description: `Blocks media from sources other than the installed app on your system.
So media installed with the app are shown but not media from the internet.`,
			key: 'lowDataMode'
		}
	];
</script>

<h1>Settings</h1>

{#each displayedSettings as { key, title, description }}
	{#if typeof $settings?.[key] === 'boolean'}
		<div class="flex ml-4">
			<div>
				<h2><label for={key}>{title}</label></h2>
				{#if description}
					<p class="ml-4 whitespace-pre-wrap">{description}</p>
				{/if}
			</div>
			<div class="flex-1">
				<input
					id={key}
					checked={$settings[key]}
					type="checkbox"
					on:input={(event) => {
						settings?.update((settings) => {
							settings[key] = event.currentTarget.checked;
							localStorage.setItem('settings', JSON.stringify(settings));
							return settings;
						});
					}}
				/>
			</div>
		</div>
	{/if}
{/each}

<button on:click={() => history.back()}>Leave</button>
