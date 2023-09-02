<script lang="ts">
	import { setContext } from '$lib/context';
	import { settingsKey, sessionKey } from '@routes/context';
	import { writable } from 'svelte/store';
	import '$lib/i18n';
	import { goto } from '$app/navigation';
	import { DEFAULT_SETTINGS } from '$lib/util';

	const settings = writable<Settings>({
		...DEFAULT_SETTINGS,
		// To prefer local storage over default settings, JS embeds the object in this notation
		// from left to right, so we put `localStorage` on the right as it will be the last object
		// to be embedded into the `settings` object, therefore it has higher precedence.
		...JSON.parse(localStorage.getItem('settings') || '{}')
	});
	setContext(settingsKey, settings);

	settings.subscribe((settings) => localStorage.setItem('settings', JSON.stringify(settings)));

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
