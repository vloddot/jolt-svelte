<script lang="ts">
	import { setContext } from '$lib/context';
	import { settingsKey, sessionKey, clientKey } from '@routes/context';
	import { writable } from 'svelte/store';
	import { Client } from '$lib/client';
	import '$lib/i18n';
	import { goto } from '$app/navigation';
	import { DEFAULT_SETTINGS } from '$lib/util';
	import { waitLocale } from 'svelte-i18n';

	const settings = writable<Settings>(DEFAULT_SETTINGS);
	setContext(settingsKey, settings);

	const session = writable<Session | null>(JSON.parse(localStorage.getItem('session') || 'null'));
	setContext(sessionKey, session);

	const client = new Client();
	setContext(clientKey, client);

	$: {
		const token = $session?.token;
		if (token) {
			client.authenticate(token);
		} else {
			client.websocket.disconnect();
		}
	}

	$: if ($session == null) {
		goto('/login');
	}
</script>

{#await waitLocale() then}
	<slot />
{/await}
