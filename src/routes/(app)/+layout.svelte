<script lang="ts">
	import { getAutumnURL, getDefaultUserAvatar } from '$lib/util';
	import ServerSidebarIcon from '@components/ServerSidebarIcon/index.svelte';
	import { event, invoke } from '@tauri-apps/api';
	import './index.css';
	import UserFetcher from '@components/UserFetcher.svelte';
	import { redirect } from '@sveltejs/kit';
	import { get, writable, type Writable } from 'svelte/store';
	import {
		sessionContext,
		setContext,
		settingsContext,
		serversContext,
		clientReadyContext,
		runningClientContext,
		getContext,
	} from '$lib/context';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const settings: Writable<Settings> = writable(
		JSON.parse(localStorage.getItem('settings') || 'null') ?? {
			lowDataMode: false
		}
	);

	const session: Writable<Session | null> = writable(
		JSON.parse(localStorage.getItem('session') || 'null')
	);

	setContext(sessionContext, session);
	setContext(settingsContext, settings);

	async function checkSession(session: Session | null) {
		if (session === null) {
			await goto('/login');
		}
	}

	$: checkSession($session);

	let clientReady = getContext(clientReadyContext) ?? writable(false);
	setContext(clientReadyContext, clientReady);

	let runningClient = getContext(runningClientContext) ?? get(clientReady);
	setContext(runningClientContext, runningClient);

	let servers = getContext(serversContext) ?? writable<Server[] | undefined>(undefined);
	setContext(serversContext, servers);

	onMount(async () => {
		checkSession($session);
		if (runningClient) {
			return;
		}

		event.listen<Server[]>('ready', (event) => {
			servers.set(event.payload);
			clientReady.set(true);
		});

		try {
			await invoke('login_with_token', {
				session_id: $session?._id,
				token: $session?.token
			});

			console.log('running client instance', runningClient);
			invoke('run_client');
			runningClient = true;
		} catch (_) {
			throw redirect(302, '/login');
		}
	});
</script>

<div class="flex">
	<div class="server-sidebar-container">
		{#if $settings?.lowDataMode}
			<ServerSidebarIcon href="/" tooltip="Home" icon="/home.svg" />
		{:else if $session !== null}
			<UserFetcher ids={[$session.user_id]} let:users>
				{#if users !== undefined}
					<ServerSidebarIcon
						href="/"
						tooltip={users[0].username}
						icon={users[0].avatar === undefined
							? getDefaultUserAvatar(users[0]._id)
							: getAutumnURL(users[0].avatar)}
					/>
				{/if}
			</UserFetcher>
		{/if}

		<hr class="border-gray-600 mx-4" />

		{#if $servers !== undefined}
			{#each $servers as server}
				{#if $settings?.lowDataMode}
					<ServerSidebarIcon
						href="/servers/{server._id}/channels/{server.channels[0]}"
						tooltip={server.name}
					/>
				{:else}
					<ServerSidebarIcon
						href="/servers/{server._id}/channels/{server.channels[0]}"
						tooltip={server.name}
						icon={server.icon === undefined ? undefined : getAutumnURL(server.icon)}
					/>
				{/if}
			{/each}
		{/if}

		<div class="flex-1" />

		<ServerSidebarIcon href="/settings" icon="/gears.svg" tooltip="Settings" />
	</div>

	<slot />
</div>
