<script lang="ts">
	import SettingsComponent from '@components/Settings/index.svelte';
	import { appWindow } from '@tauri-apps/api/window';
	import type { PageData } from './$types';

	export let data: PageData;

	$: {
		const title = `${data.section.title} - Jolt`;

		if ('__TAURI__' in window) {
			appWindow.setTitle(title);
		} else {
			document.title = title;
		}
	}
</script>

<SettingsComponent settings={data.section.settings} />
