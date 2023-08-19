<script lang="ts">
	import '$lib/i18n';
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { invoke } from '@tauri-apps/api';
	import { onMount, setContext } from 'svelte';
	import { lowDataModeKey, userIDKey } from '@components/ChannelBar';
	import DirectMessages from '@components/ChannelBar/DirectMessages.svelte';

	export let data: PageData;

	setContext(userIDKey, data.session.user_id);
	setContext(lowDataModeKey, data.settings.lowDataMode);

	onMount(async () => {
		if (data.session !== null) {
			try {
				await invoke('login_with_token', {
					session_id: data.session._id,
					token: data.session.token
				});

				invoke('run_client');
			} catch (_) {
				throw redirect(302, '/login');
			}
		}
	});
</script>

<DirectMessages userID={data.session.user_id} lowDataMode={data.settings.lowDataMode} />

<div class="main-content-container">
	<p>so um hi this is mr john jolt (home page ig)</p>
	ig you can join a server
</div>
