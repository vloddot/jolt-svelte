<script lang="ts">
	import '$lib/index.css';
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import { settingsKey } from '@routes/context';
	import ServerSidebarIcon from '@components/ServerSidebarIcon/index.svelte';
	import { getDisplayAvatar, getAutumnURL, DEFAULT_SETTINGS } from '$lib/util';

	const settings = getContext(settingsKey)!;
	const session = getContext(sessionKey)!;
	const client = getContext(clientKey)!;
	let servers = client.api.cache?.servers;

	settings.subscribe((settings) => {
		servers = servers?.sort(
			(s1, s2) =>
				(settings.ordering.servers?.indexOf(s1._id) ?? -1) -
				(settings.ordering.servers?.indexOf(s2._id) ?? -1)
		);
	});

	client.on('Ready', async (event) => {
		servers = event.servers;

		const result = await client.api.fetchSettings<keyof Settings>(
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
