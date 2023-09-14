<script lang="ts">
	import { goto } from '$app/navigation';
	import { Client } from '$lib/client';
	import { setContext } from '$lib/context';
	import '$lib/i18n';
	import { DEFAULT_SETTINGS } from '$lib/util';
	import VoiceClientBrowser, { DEFAULT_CONSUMER } from '@revkit/voice/browser';
	import { clientKey, sessionKey, settingsKey, voiceClientKey } from '@routes/context';
	import { waitLocale } from 'svelte-i18n';
	import { writable } from 'svelte/store';

	const settings = writable<Settings>(DEFAULT_SETTINGS);
	setContext(settingsKey, settings);

	const session = writable<Session | null>(JSON.parse(localStorage.getItem('session') || 'null'));
	setContext(sessionKey, session);

	const client = new Client();
	setContext(clientKey, client);

	const voiceClient = new VoiceClientBrowser(DEFAULT_CONSUMER);
	setContext(voiceClientKey, voiceClient);

	$: {
		if ($session == null) {
			client.websocket.disconnect();
			voiceClient.disconnect();
		} else {
			const { token, user_id } = $session;
			client.authenticate(token);
			voiceClient.authenticate(token, user_id, 'user');
		}
	}

	$: if ($session == null) {
		goto('/login');
	}
</script>

{#await waitLocale() then}
	<slot />
{/await}
