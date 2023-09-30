<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Client } from '$lib/client';
	import { setContext } from '$lib/context';
	import { DEFAULT_SETTINGS } from '$lib/util';
	import { clientKey, sessionKey, settingsKey, voiceClientKey } from '@routes/context';
	import { waitLocale } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import VoiceClientBrowser, { DEFAULT_CONSUMER } from '@revkit/voice/browser';
	import '$lib/i18n';

	const settings = writable<Settings>(DEFAULT_SETTINGS);
	setContext(settingsKey, settings);

	const session = writable<Session | null>(JSON.parse(localStorage.getItem('session') || 'null'));
	setContext(sessionKey, session);

	const client = new Client();
	setContext(clientKey, client);

	const voiceClient = writable<VoiceClientBrowser | null>();
	setContext(voiceClientKey, voiceClient);

	$: {
		if ($session == null) {
			client.websocket.disconnect();
			$voiceClient?.disconnect();
			voiceClient.set(null);
		} else {
			const { token } = $session;

			client.authenticate(token);
			voiceClient.set(new VoiceClientBrowser({ token, type: 'user' }, DEFAULT_CONSUMER));
		}
	}

	$: if ($session == null) {
		goto(`${base}/login`);
	}
</script>

{#await waitLocale() then}
	<slot />
{/await}
