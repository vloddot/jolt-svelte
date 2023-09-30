<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Client } from '$lib/client';
	import { setContext } from '$lib/context';
	import { DEFAULT_SETTINGS } from '$lib/util';
	import { clientKey, sessionKey, settingsKey } from '@routes/context';
	import { waitLocale } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import '$lib/i18n';

	const settings = writable<Settings>(DEFAULT_SETTINGS);
	setContext(settingsKey, settings);

	const session = writable<Session | null>(JSON.parse(localStorage.getItem('session') || 'null'));
	setContext(sessionKey, session);

	const client = new Client();
	setContext(clientKey, client);

	$: {
		if ($session == null) {
			client.websocket.disconnect();
		} else {
			const { token } = $session;

			client.authenticate(token);
		}
	}

	$: if ($session == null) {
		goto(`${base}/login`);
	}
</script>

{#await waitLocale() then}
	<slot />
{/await}
