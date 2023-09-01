<script lang="ts">
	import { event, invoke } from '@tauri-apps/api';
	import './index.css';
	import { writable } from 'svelte/store';
	import { setContext, getContext } from '$lib/context';
	import { clientReadyKey, serversKey, dmsKey } from '@routes/(app)/context';
	import { sessionKey } from '@routes/context';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const session = getContext(sessionKey)!;

	const clientReady = writable(false);
	setContext(clientReadyKey, clientReady);

	const servers = writable<Server[] | undefined>(undefined);
	setContext(serversKey, servers);

	let dms = writable<Channel[]>([]);
	setContext(dmsKey, dms);

	$: if ($clientReady) {
		invoke<Channel[]>('fetch_direct_messages').then((result) => {
			dms.set(result);
		});
	}

	onMount(async () => {
		event.listen<Server[]>('ready', (event) => {
			servers.set(event.payload);
			clientReady.set(true);
		});

		try {
			await invoke('login_with_token', {
				session_id: $session._id,
				token: $session.token
			});

			invoke('run_client');
		} catch (_) {
			await goto('/login');
		}
	});
</script>

<slot />
