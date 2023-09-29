<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getContext, setContext } from '$lib/context';
	import '$lib/index.css';
	import { getAutumnURL, getDisplayAvatar } from '$lib/util';
	import ServerSidebarIcon from '@components/ServerSidebarIcon/index.svelte';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { clientKey, settingsKey } from '@routes/context';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import './index.css';
	import Home from '$lib/icons/home.svg';
	import Plus from '$lib/icons/plus.svg';
	import Cog6Tooth from '$lib/icons/cog-6-tooth.svg';

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const selectedServerID = writable<string | undefined>();
	const selectedChannelID = writable<string | undefined>();

	setContext(selectedChannelIDKey, selectedChannelID);
	setContext(selectedServerIDKey, selectedServerID);

	let servers = Array.from(client.api.cache.servers.values());

	settings.subscribe((settings) => {
		servers = servers.sort((a, b) => {
			const aIndex = settings.ordering.servers?.indexOf(a._id) ?? -1;
			const bIndex = settings.ordering.servers?.indexOf(b._id) ?? -1;

			// sort unordered servers to put them at the bottom
			if (bIndex == -1) {
				return -1;
			}

			if (aIndex == -1) {
				return 1;
			}

			return aIndex - bIndex;
		});
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

	client.on('Ready', async (event) => {
		servers = event.servers;

		const result = await client.api.fetchSettings(['ordering']);

		if (result.ordering == undefined) {
			return;
		}

		const [revision, ordering] = result.ordering;

		if (revision > Number(localStorage.getItem('revision:ordering')) ?? 0) {
			localStorage.setItem('revision:ordering', revision.toString());
			settings.update((settings) => (settings.ordering = JSON.parse(ordering).servers));
		}
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
				// @ts-expect-error thinks you can't access with `key`
				data[key] = value;
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

	onMount(() => {
		const localSettings = localStorage.getItem('settings');
		if (localSettings != null) {
			settings.set(JSON.parse(localSettings));
		}

		settings.subscribe((settings) => {
			localStorage.setItem('settings', JSON.stringify(settings));
		});
	});
</script>

<div class="grid-container">
	<div class="server-sidebar-container">
		{#if $settings['jolt:low-data-mode']}
			<ServerSidebarIcon href="{base}/" tooltip="Home" icon={Home} />
			<hr class="border-gray-600 mx-4" />
		{:else}
			{#await client.user ?? client.api.fetchUser('@me') then user}
				<ServerSidebarIcon
					href="{base}/"
					tooltip="{user.username}#{user.discriminator}"
					icon={getDisplayAvatar(client.user)}
				/>

				<hr class="border-gray-600 mx-4" />
			{/await}
		{/if}

		{#if servers != undefined}
			{#each servers as server}
				{#if $settings['jolt:low-data-mode']}
					<ServerSidebarIcon
						href="{base}/servers/{server._id}/channels/{server.channels[0]}"
						tooltip={server.name}
					/>
				{:else}
					<ServerSidebarIcon
						href="{base}/servers/{server._id}/channels/{server.channels[0]}"
						tooltip={server.name}
						icon={server.icon == undefined
							? undefined
							: `${getAutumnURL(server.icon, { max_side: '256' })}`}
					/>
				{/if}
			{/each}
		{/if}
		<ServerSidebarIcon href="{base}/servers/create" icon={Plus} tooltip="Create Server" />

		<div class="flex-1" />

		<ServerSidebarIcon href="{base}/settings" icon={Cog6Tooth} tooltip="Settings" />
	</div>

	<slot />
</div>
