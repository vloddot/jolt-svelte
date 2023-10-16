<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getContext, setContext } from '$lib/context';
	import { getAutumnURL, getDisplayAvatar } from '$lib/util';
	import ServerSidebarIcon from '@components/ServerSidebarIcon.svelte';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { clientKey, settingsKey } from '@routes/context';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import HomeIcon from '@components/Icons/HomeIcon.svelte';
	import PlusIcon from '@components/Icons/PlusIcon.svelte';
	import Cog6ToothIcon from '@components/Icons/Cog6ToothIcon.svelte';
	import { page } from '$app/stores';

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const selectedServerID = writable<string | undefined>();
	const selectedChannelID = writable<string | undefined>();

	setContext(selectedChannelIDKey, selectedChannelID);
	setContext(selectedServerIDKey, selectedServerID);

	let servers = Array.from(client.api.cache.servers.values());

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
		servers = Array.from(client.api.cache.servers.values());
	});

	client.on('ServerDelete', async ({ id }) => {
		servers = Array.from(client.api.cache.servers.values());

		if ($selectedServerID == id) {
			await goto(`${base}/`);
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

		const serverSettings = await client.api.fetchSettings(Object.keys(settingsValue));
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

			if (serverRevision >= localRevision) {
				localStorage.setItem(revisionKey, serverRevision.toString());
				localStorage.setItem(key, serverValue);
				settingsValue[key] = JSON.parse(serverValue);
			} else {
				// @ts-expect-error typescript stupid
				serverSettingsUpdate[key] = localValue;
			}
		}

		client.api.setSettings(serverSettingsUpdate);
		settings.set(settingsValue);
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
		{#if $settings['jolt:low-data-mode']}
			<ServerSidebarIcon
				selected={$page.route.id?.startsWith('/(app)/(home)') ?? false}
				href="{base}/"
				tooltip="Home"
			>
				<HomeIcon />
			</ServerSidebarIcon>
			<hr class="border-gray-600 mx-4" />
		{:else}
			{#await client.user ?? client.api.fetchUser('@me') then user}
				<ServerSidebarIcon
					href="{base}/"
					selected={$page.route.id?.startsWith('/(app)/(home)') ?? false}
					ariaLabel="Home"
					tooltip="{user.username}#{user.discriminator}"
				>
					<img class="cover" src={getDisplayAvatar(user)} alt="Home" width="48px" height="48px" />
				</ServerSidebarIcon>

				<hr class="border-gray-600 mx-4" />
			{/await}
		{/if}

		{#each servers as server}
			<ServerSidebarIcon
				href="{base}/servers/{server._id}/channels/{server.channels[0]}"
				tooltip={server.name}
				selected={$selectedServerID == server._id}
			>
				{#if server.icon == undefined || $settings['jolt:low-data-mode']}
					{server.name
						.split(' ')
						.map((s) => s[0])
						.join('')}
				{:else}
					<img
						class="cover"
						src={getAutumnURL(server.icon, { max_side: '256' })}
						alt={server.name}
						width="48px"
						height="48px"
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
		width: 72px;
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
		width: 256px;
		display: flex;
		flex-direction: column;
		background-color: var(--secondary-background);
		border-left: 1px solid var(--secondary-header);
		overflow-y: scroll;
	}

	:global(img.cover) {
		border-radius: 100%;
		object-fit: cover;
	}
</style>
