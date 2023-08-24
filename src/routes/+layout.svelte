<script lang="ts">
	import { sessionContext, setContext, settingsContext } from '$lib/context';
	import { writable, type Writable } from 'svelte/store';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const settings: Writable<Settings> = writable(
		JSON.parse(localStorage.getItem('settings') || 'null') ?? {
			lowDataMode: false
		}
	);

	const session: Writable<Session | null> = writable(
		JSON.parse(localStorage.getItem('session') || 'null')
	);

	setContext(sessionContext, session);
	setContext(settingsContext, settings);

	async function checkSession(session: Session | null) {
		if (session === null) {
			await goto('/login');
		}
	}

	onMount(() => checkSession($session));
	$: checkSession($session);
</script>

<slot />
