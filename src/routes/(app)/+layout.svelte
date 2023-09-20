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

	const settings = getContext(settingsKey)!;
	const client = getContext(clientKey)!;

	const selectedServerID = writable<string | undefined>();
	const selectedChannelID = writable<string | undefined>();

	setContext(selectedChannelIDKey, selectedChannelID);
	setContext(selectedServerIDKey, selectedServerID);

	let servers = client.api.cache.servers;

	settings.subscribe((settings) => {
		servers = servers?.sort((a, b) => {
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

	client.on('ServerCreate', ({ server, channels }) => {
		client.api.cache.channels = client.api.cache.channels.concat(channels);
		client.api.cache.servers.push(server);
		servers = client.api.cache.servers;
	});

	client.on('ServerDelete', async ({ id }) => {
		client.api.cache.channels = client.api.cache.channels.filter((channel) => {
			if (channel.channel_type == 'TextChannel' || channel.channel_type == 'VoiceChannel') {
				return channel.server != id;
			}

			return true;
		});

		client.api.cache.servers = client.api.cache.servers.filter((server) => server._id != id);
		servers = client.api.cache.servers;

		if ($selectedServerID == id) {
			await goto(`${base}/`);
		}
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
</script>

<div class="grid-container">
	<div class="server-sidebar-container">
		{#if $settings['jolt:low-data-mode']}
			<ServerSidebarIcon href={base} tooltip="Home" icon="{base}/home.svg" />
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
		<ServerSidebarIcon
			href="{base}/servers/create"
			icon="{base}/plus.svg"
			tooltip="Create Server"
		/>

		<div class="flex-1" />

		<ServerSidebarIcon href="{base}/settings" icon="{base}/gears.svg" tooltip="Settings" />
	</div>

	<slot />
</div>
