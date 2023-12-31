<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getContext, setContext } from '$lib/context';
	import { getAutumnURL } from '$lib/util';
	import ServerSidebarIcon from '@components/ServerSidebarIcon.svelte';
	import { clientKey, settingsKey } from '@routes/context';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import HomeIcon from '@components/Icons/HomeIcon.svelte';
	import PlusIcon from '@components/Icons/PlusIcon.svelte';
	import Cog6ToothIcon from '@components/Icons/Cog6ToothIcon.svelte';
	import { page } from '$app/stores';
	import { selectedServerKey, selectedChannelKey } from './context';
	import type { LayoutParams } from './$types';

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	let selectedChannel = writable<Channel | undefined>();
	setContext(selectedChannelKey, selectedChannel);

	let selectedServer = writable<Server | undefined>();
	setContext(selectedServerKey, selectedServer);

	$: pageParams = $page.params as LayoutParams;

	$: if (pageParams.cid == undefined) {
		selectedChannel.set(undefined);
	} else {
		client.fetchChannel(pageParams.cid).then((value) => selectedChannel.set(value));
	}

	$: if (pageParams.sid == undefined) {
		selectedServer.set(undefined);
	} else {
		client.fetchServer(pageParams.sid).then((value) => selectedServer.set(value));
	}

	let servers = Array.from(client.cache.servers.values());

	function sortServers(servers: Server[], ordering: string[]) {
		return servers.sort((a, b) => {
			const aIndex = ordering.indexOf(a._id) ?? -1;
			const bIndex = ordering.indexOf(b._id) ?? -1;

			// sort unordered servers to put them at the bottom
			if (bIndex == -1) {
				return -1;
			}

			if (aIndex == -1) {
				return 1;
			}

			return aIndex - bIndex;
		});
	}

	settings.subscribe((settings) => {
		servers = sortServers(servers, settings.ordering.servers ?? []);
	});

	client.on('ServerCreate', () => {
		servers = sortServers(
			Array.from(client.cache.servers.values()),
			$settings.ordering.servers ?? []
		);
	});

	client.on('ServerDelete', ({ id }) => {
		servers = sortServers(
			Array.from(client.cache.servers.values()),
			$settings.ordering.servers ?? []
		);

		if ($selectedServer?._id == id) {
			goto(`${base}/`);
		}
	});

	client.on('Ready', (event) => {
		servers = sortServers(event.servers, $settings.ordering.servers ?? []);
	});

	onMount(async () => {
		const settingsValue = get(settings);

		for (const key of Object.keys(settingsValue) as (keyof Settings)[]) {
			const value = localStorage.getItem(key);
			if (value != null) {
				settingsValue[key] = JSON.parse(value);
			}
		}

		const serverSettings = await client.fetchSettings(Object.keys(settingsValue));
		const serverSettingsUpdate: Partial<Settings> = {};

		for (const [key, localValue] of Object.entries(settingsValue) as [
			keyof Settings,
			Settings[keyof Settings]
		][]) {
			const revisionKey = `revision:${key}`;

			const serverSetting = serverSettings[key];
			if (serverSetting == undefined) {
				continue;
			}

			const [serverRevision, serverValue] = serverSetting;
			const localRevision = Number(localStorage.getItem(revisionKey) ?? '0');

			if (serverRevision == localRevision) {
				continue;
			}

			if (serverRevision > localRevision) {
				localStorage.setItem(revisionKey, serverRevision.toString());
				localStorage.setItem(key, serverValue);
				settingsValue[key] = JSON.parse(serverValue);
			} else {
				// @ts-expect-error typescript stupid
				serverSettingsUpdate[key] = localValue;
			}
		}

		if (Object.keys(serverSettingsUpdate).length != 0) {
			client.setSettings(serverSettingsUpdate);
		}

		settings.set(settingsValue);

		settings.subscribe((settings) => {
			for (const [key, value] of Object.entries(settings)) {
				localStorage.setItem(key, JSON.stringify(value));
			}
		});
	});

	client.on('UserSettingsUpdate', ({ id, update }) => {
		if (id != client.user?._id) {
			return;
		}

		let data: Partial<Settings> = {};
		for (const [key, [revision, value]] of Object.entries(update)) {
			const revisionID = `revision:${key}`;

			if (revision > Number(localStorage.getItem(revisionID)) ?? 0) {
				localStorage.setItem(revisionID, revision.toString());
				localStorage.setItem(key, value);
				// @ts-expect-error thinks you can't access with `key`
				data[key] = JSON.parse(value);
			}
		}

		settings.update((settings) => {
			for (const [key, value] of Object.entries(data)) {
				// @ts-expect-error thinks you can't access with `key`
				settings[key] = value;
			}
			return settings;
		});
	});
</script>

<div class="app-container">
	<div class="server-sidebar-container">
		<ServerSidebarIcon
			selected={$page.route.id?.startsWith('/(app)/(chat)/(home)') ?? false}
			href="{base}/"
			tooltip="Home"
		>
			<HomeIcon />
		</ServerSidebarIcon>

		<hr />

		{#each servers as { channels, _id: id, name, icon }}
			<ServerSidebarIcon
				href="{base}/servers/{id}/channels/{channels[0]}"
				tooltip={name}
				selected={$selectedServer?._id == id}
			>
				{#if icon == undefined || $settings['jolt:low-data-mode']}
					{@const words = name.split(' ')}
					{#if words.length > 3}
						{words
							.slice(0, 3)
							.map((s) => s[0])
							.join('')}...
					{:else}
						{words.map((s) => s[0]).join('')}
					{/if}
				{:else}
					<img
						class="cover"
						src={getAutumnURL(icon, { max_side: '256' })}
						alt={name}
						width="42px"
						height="42px"
					/>
				{/if}
			</ServerSidebarIcon>
		{/each}
		<ServerSidebarIcon
			selected={$page.route.id == '/(app)/servers/create'}
			href="{base}/servers/create"
			tooltip="Create Server"
		>
			<PlusIcon />
		</ServerSidebarIcon>

		<div class="flex-1" />

		<ServerSidebarIcon
			selected={$page.route.id?.startsWith('/(app)/settings') ?? false}
			href="{base}/settings"
			tooltip="Settings"
		>
			<Cog6ToothIcon />
		</ServerSidebarIcon>
	</div>

	<slot />
</div>

<style lang="scss">
	:global(body) {
		overflow: hidden;
	}

	.app-container {
		display: flex;
		width: 100%;
		height: 100vh;
	}

	.server-sidebar-container {
		width: 64px;
		height: 100vh;
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
		border-right: 1px solid var(--secondary-header);
		background-color: var(--background);
		overflow-y: scroll;
	}

	:global(.channel-bar-container) {
		width: 232px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		border-right: 1px solid var(--secondary-header);
		background-color: var(--secondary-background);
		overflow-y: scroll;
	}

	:global(.main-content-container) {
		flex: 1;
		height: 100vh;
		overflow-x: hidden;
		background-color: var(--primary-background);
	}

	:global(.members-list-container) {
		height: 100vh;
		width: 232px;
		display: flex;
		flex-direction: column;
		background-color: var(--secondary-background);
		border-left: 1px solid var(--secondary-header);
		overflow-y: scroll;
		overflow-x: hidden;
	}

	:global(img.cover) {
		border-radius: 100%;
		object-fit: cover;
	}
</style>
