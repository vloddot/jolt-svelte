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

	const settings = writable(DEFAULT_SETTINGS);
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
		--mention: #3399ff30;
		--tertiary-background: #3d3d3d;
		--tertiary-foreground: #666666;
		--status-online: #12ca74;
		--status-idle: #f1b040;
		--status-busy: #f53d42;
		--status-invisible: #80848e;
		--hover: rgba(255, 255, 255, 0.075);
		--scrollbar-track: transparent;
		--scrollbar-thumb: #2469b2;
		--error: #d2373d;
		--scrollbar-thickness: 5px;
		--border-radius: 6px;
	}

	:global(body) {
		background-color: var(--background);
		caret-color: var(--accent);
		font-family: sans-serif;
		font-size: 14px;
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
		color: var(--accent);
	}

	:global(hr) {
		border-color: var(--secondary-header);
		width: calc(100% - 36px);
	}

	:global(.flex-container) {
		display: flex;
	}

	:global(.flex-col) {
		flex-direction: column;
	}

	:global(.flex-divider) {
		flex: 1;
	}

	:global(.danger) {
		color: var(--error);
	}

	:global(input, textarea, button) {
		background-color: var(--secondary-background);
		color: var(--secondary-foreground);
		font-size: inherit;
		font-family: inherit;
		border: none;
		padding: 8px;
		border-radius: var(--border-radius);
		transition: background-color 100ms, outline 50ms;
	}

	:global(button) {
		cursor: pointer;
		border: 1px solid var(--primary-header);
	}

	:global(.default-button) {
		cursor: pointer;
		margin: 0 16px;
		background-color: transparent;
		border: none;
		padding: 0;
		outline: none;

		&:focus,
		&:hover {
			outline: none;
			background-color: transparent;
		}
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

	:global(.tippy-box) {
		background-color: black !important;
		border-radius: var(--border-radius) !important;
	}

	:global(.tippy-box[data-theme='top-tooltip'] > .tippy-arrow::before) {
		border-top-color: black !important;
	}

	:global(.tippy-box[data-theme='right-tooltip'] > .tippy-arrow::before) {
		border-right-color: black !important;
	}

	:global(.modal) {
		display: flex;
		height: 100vh;
		align-items: center;
	}

	:global(details) {
		margin-top: 8px;
		:global(> summary) {
			user-select: none;
			margin-left: 8px;
			cursor: pointer;
			font-size: 10px;
			font-weight: 600;
			cursor: pointer;
		}
	}

	:global(.modal-base) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 400px;
		gap: 2px;
		margin-left: 5%;
		border-left: solid var(--accent);
		border-radius: var(--border-radius);
		padding: 20px;
		background-color: var(--primary-background);
	}
</style>
