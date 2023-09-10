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

<main class="main-content-container">
	<p>so um hi this is mr john jolt (home page ig)</p>
	ig you can join a server
</main>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content="Jolt - Home" />
</svelte:head>
