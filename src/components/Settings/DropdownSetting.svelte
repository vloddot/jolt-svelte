<script lang="ts">
	import { getContext } from '$lib/context';
	import type { DisplayedSetting } from '@routes/(app)/settings/sections';
	import { clientKey } from '@routes/context';
	import SettingsComponent from './index.svelte';

	export let setting: Extract<DisplayedSetting, { type: 'dropdown' }>;

	const client = getContext(clientKey)!;
	let formNode: HTMLFormElement;
	async function handleSubmitEvent(event: SubmitEvent) {
		if (setting.action.type == 'change-username') {
			const username = formNode.querySelector<HTMLInputElement>(`#${setting.action.usernameId}`)!.value;
			const password = formNode.querySelector<HTMLInputElement>(`#${setting.action.passwordId}`)!.value;

			client.user = await client.api.changeUsername(username, password);
		}
	}
</script>

<details>
	<summary>
		<h2><label for={setting.id}>{setting.title}</label></h2>
		{#if setting.description}
			<p class="ml-4 whitespace-pre-wrap">{setting.description}</p>
		{/if}
	</summary>
	<form on:submit={handleSubmitEvent} bind:this={formNode}>
		<SettingsComponent settings={setting.form} />
		<button type="submit">Submit</button>
	</form>
</details>
