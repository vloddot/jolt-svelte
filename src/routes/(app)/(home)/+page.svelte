<script lang="ts">
	import '$lib/i18n';
	import { appWindow } from '@tauri-apps/api/window';

	const TITLE = 'Jolt - Direct Messages';

	$: {
		if ('__TAURI__' in window) {
			appWindow.setTitle(TITLE);
		}
	}
</script>

Page reserved for future use...
<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content="Jolt - Home" />
</svelte:head>
