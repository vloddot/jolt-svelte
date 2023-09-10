<script lang="ts">
	import { appWindow } from '@tauri-apps/api/window';
	import type { PageData } from './$types';
	import Setting from '@components/Setting.svelte';

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

{#each data.section.settings as setting}
	<Setting {...setting} />
{/each}
