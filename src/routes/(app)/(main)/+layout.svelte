<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientReadyKey, serversKey } from '@routes/(app)/context';
	import { sessionKey } from '@routes/context';
	import { settingsKey } from '@routes/context';
	import ServerSidebarIcon from '@components/ServerSidebarIcon/index.svelte';
	import { fetchUser, getDisplayAvatar, getAutumnURL } from '$lib/util';

	const clientReady = getContext(clientReadyKey);
	const settings = getContext(settingsKey)!;
	const session = getContext(sessionKey)!;
	const servers = getContext(serversKey);
</script>

<div class="grid-container">
	<div class="server-sidebar-container">
		{#if $clientReady}
			{#if $settings.lowDataMode}
				<ServerSidebarIcon href="/" tooltip="Home" icon="/home.svg" />
			{:else}
				{#await fetchUser($session.user_id) then user}
					<ServerSidebarIcon
						href="/"
						tooltip="{user.username}#{user.discriminator}"
						icon={getDisplayAvatar(user)}
					/>

					<hr class="border-gray-600 mx-4" />
				{/await}
			{/if}
		{/if}

		{#if $servers != undefined}
			{#each $servers as server}
				{#if $settings.lowDataMode}
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
