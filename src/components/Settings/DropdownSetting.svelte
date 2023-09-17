<script lang="ts">
	import { getContext } from '$lib/context';
	import type { DisplayedSetting } from '@routes/(app)/settings/sections';
	import { clientKey, sessionKey, settingsKey } from '@routes/context';
	import { dispatchAction } from '.';
	import SettingsComponent from './index.svelte';

	export let setting: Extract<DisplayedSetting, { type: 'dropdown' }>;
	const session = getContext(sessionKey)!;
	const client = getContext(clientKey)!;
	const settings = getContext(settingsKey)!;

	let node: HTMLFormElement;
</script>

<details>
	<summary>
		<h2><label for={setting.id}>{setting.title}</label></h2>
		{#if setting.description}
			<p class="ml-4 whitespace-pre-wrap">{setting.description}</p>
		{/if}
	</summary>
	<form
		on:submit={() => {
			const action = setting.action;
			if (action == undefined) {
				return;
			}

			switch (action.type) {
				case 'change-username': {
					dispatchAction({
						...action,
						client,
						node
					});
					break;
				}
				case 'logout': {
					dispatchAction({
						...action,
						client,
						session
					});
					break;
				}
			}
		}}
		bind:this={node}
	>
		<SettingsComponent settings={setting.form} />
		<button type="submit">Submit</button>
	</form>
</details>
