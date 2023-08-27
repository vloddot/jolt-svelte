<script lang="ts">
	import { sessionKey, setContext, settingsKey } from '$lib/context';
	import { writable } from 'svelte/store';
	import '$lib/i18n';
	import { goto } from '$app/navigation';

	const settings = writable<Settings>(
		JSON.parse(localStorage.getItem('settings') || 'null') ?? {
			lowDataMode: false
		}
	);
	setContext(settingsKey, settings);

	const session = writable<Session | null>(JSON.parse(localStorage.getItem('session') || 'null'));

	setContext(sessionKey, session);

	async function checkSession(session: Session | null) {
		if (session == null) {
			await goto('/login');
		}
	}

	$: checkSession($session);
</script>

<slot />
