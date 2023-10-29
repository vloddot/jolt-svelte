<script lang="ts">
	import SettingsSection from '@components/Settings/Section.svelte';
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { appWindow } from '@tauri-apps/api/window';

	export let data: LayoutData;

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;

	$: {
		let title = 'Jolt - Settings';

		const section = data.sections.find(
			(section) => section.type == 'link' && $page.url.pathname.endsWith(section.id)
		);

		if (section != undefined) {
			title += ` - ${section.title}`;
		}

		document.title = title;
		if ('__TAURI__' in window) {
			appWindow.setTitle(title);
		}
	}
</script>

<div class="channel-bar-container">
	{#each data.sections as section}
		<SettingsSection {section} />
	{/each}

	<button
		class="button danger"
		on:click={async () => {
			await client.destroy();
			session.set(null);
		}}
	>
		Logout
	</button>
</div>

<main class="main-content-container">
	<slot />
</main>

<style lang="scss">
	.button {
		text-align: start;
		margin: 8px;
	}
</style>
