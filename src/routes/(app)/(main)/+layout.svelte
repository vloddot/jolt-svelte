<script lang="ts">
	import '$lib/index.css';
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import { settingsKey } from '@routes/context';
	import ServerSidebarIcon from '@components/ServerSidebarIcon/index.svelte';
	import { getDisplayAvatar, getAutumnURL, DEFAULT_SETTINGS } from '$lib/util';
	import { selectedServerIDKey } from '@routes/(app)/context';
	import { goto } from '$app/navigation';

	const settings = getContext(settingsKey)!;
	const session = getContext(sessionKey)!;
	const client = getContext(clientKey)!;
	const selectedServerID = getContext(selectedServerIDKey);
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

		console.log($selectedServerID);
		if ($selectedServerID == id) {
			await goto('/');
		}
	});

	client.on('Ready', async (event) => {
		servers = event.servers;

		const result = await client.api.fetchSettings(
			Object.keys(DEFAULT_SETTINGS) as (keyof Settings)[]
		);

		settings.update((settings) => {
			for (const [key, [revision, value]] of Object.entries(result)) {
				const revisionID = `revision:${key}`;

				if (revision < Number(localStorage.getItem(revisionID)) ?? 0) {
					continue;
				}

				settings[key as keyof Settings] = JSON.parse(value);
				localStorage.setItem(revisionID, revision.toString());
			}

			return settings;
		});
	});
</script>

<div class="grid-container">
	<div class="server-sidebar-container">
		{#if $settings['jolt:low-data-mode']}
			<ServerSidebarIcon href="/" tooltip="Home" icon="/home.svg" />
		{:else}
			{#await client.api.fetchUser($session.user_id) then user}
				<ServerSidebarIcon
					href="/"
					tooltip="{user.username}#{user.discriminator}"
					icon={getDisplayAvatar(user)}
				/>

				<hr class="border-gray-600 mx-4" />
			{/await}
		{/if}

		{#if servers != undefined}
			{#each servers as server}
				{#if $settings['jolt:low-data-mode']}
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
