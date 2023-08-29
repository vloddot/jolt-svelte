<script lang="ts">
	import { fetchUser, getAutumnURL, getDisplayAvatar } from '$lib/util';
	import ServerSidebarIcon from '@components/ServerSidebarIcon/index.svelte';
	import { event, invoke } from '@tauri-apps/api';
	import './index.css';
	import { get, writable } from 'svelte/store';
	import {
		sessionKey,
		setContext,
		settingsKey,
		serversKey,
		clientReadyKey,
		runningClientKey,
		getContext
	} from '$lib/context';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const session = getContext(sessionKey)!;
	const settings = getContext(settingsKey);

	let clientReady = getContext(clientReadyKey) ?? writable(false);
	setContext(clientReadyKey, clientReady);

	let runningClient = getContext(runningClientKey) ?? get(clientReady);
	setContext(runningClientKey, runningClient);

	let servers = getContext(serversKey) ?? writable<Server[] | undefined>(undefined);
	setContext(serversKey, servers);

	onMount(async () => {
		if (runningClient) {
			return;
		}

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
			runningClient = true;
		} catch (_) {
			await goto('/login');
		}
	});
</script>

<div class="grid-container">
	<div class="server-sidebar-container">
		{#if $clientReady}
			{#if $settings?.lowDataMode}
				<ServerSidebarIcon href="/" tooltip="Home" icon="/home.svg" />
			{:else}
				{#await fetchUser($session.user_id) then user}
					<ServerSidebarIcon href="/" tooltip="{user.username}#{user.discriminator}" icon={getDisplayAvatar(user)} />
					<hr class="border-gray-600 mx-4" />
				{/await}
			{/if}
		{/if}

		{#if $servers != undefined}
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
						icon={server.icon == undefined ? undefined : getAutumnURL(server.icon)}
					/>
				{/if}
			{/each}
		{/if}

		<div class="flex-1" />

		<ServerSidebarIcon href="/settings" icon="/gears.svg" tooltip="Settings" />
	</div>

	<slot />
</div>
