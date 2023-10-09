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

<style lang="scss">
	:root {
		--accent: #3399ff;
		--background: #141414;
		--foreground: #dddddd;
		--primary-background: #202020;
		--primary-header: #323232;
		--secondary-background: #1a1a1a;
		--secondary-foreground: #aaaaaa;
		--secondary-header: #262626;
		--message-box: #2d2d2d;
		--tertiary-background: #3d3d3d;
		--tertiary-foreground: #666666;
		--hover: rgba(255, 255, 255, 0.075);
		--scrollbar-track: transparent;
		--scrollbar-thumb: #2469b2;
		--scrollbar-thickness: 5px;
		--border-radius: 6px;
	}

	:global(body) {
		background-color: var(--background);
		caret-color: var(--accent);
		font-family: 'Open Sans', sans-serif;
		overflow-x: scroll;
		margin: 0;
	}

	:global(::-webkit-scrollbar) {
		width: var(--scrollbar-thickness);
	}

	:global(::-webkit-scrollbar-thumb) {
		min-width: 30px;
		min-height: 30px;
		background-color: var(--scrollbar-thumb);
	}

	:global(::-webkit-scrollbar-track) {
		background-color: var(--scrollbar-track);
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: transparent;
	}

	:global(::-webkit-scrollbar-corner) {
		background: transparent;
	}

	:global(a) {
		text-decoration: none;
	}

	:global(input, textarea, button) {
		background-color: var(--secondary-background);
		color: var(--secondary-foreground);
		border: none;
		padding: 8px;
		border-radius: var(--border-radius);
		transition: background-color 100ms, outline 50ms;
	}

	:global(button) {
		cursor: pointer;
	}

	:global(input:hover, textarea:hover, button:hover) {
		background-color: var(--hover);
	}

	:global(input:focus, button:focus) {
		outline: var(--accent) solid 2px;
	}

	:global(:focus) {
		outline: none;
	}

	:global(*) {
		color: var(--foreground);
	}
</style>
