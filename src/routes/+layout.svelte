<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Client } from '$lib/client';
	import { setContext } from '$lib/context';
	import { DEFAULT_SETTINGS } from '$lib/util';
	import VoiceClientBrowser, { DEFAULT_CONSUMER } from '@revkit/voice/browser';
	import { clientKey, sessionKey, settingsKey, voiceClientKey } from '@routes/context';
	import { waitLocale } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import '$lib/i18n';

	const settings = writable<Settings>(DEFAULT_SETTINGS);
	setContext(settingsKey, settings);

	const session = writable<Session | null>(JSON.parse(localStorage.getItem('session') || 'null'));
	setContext(sessionKey, session);

	const client = new Client();
	setContext(clientKey, client);

	const voiceClient = writable<VoiceClientBrowser | undefined>();
	setContext(voiceClientKey, voiceClient);

	$: {
		if ($session == null) {
			client.websocket.disconnect();
			$voiceClient?.disconnect();
		} else {
			const { token } = $session;
			voiceClient.set(new VoiceClientBrowser({ token, type: 'user' }, DEFAULT_CONSUMER));

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
