<script lang="ts">
	import { getAutumnURL } from '$lib/util';
	import ServerSidebarIcon from '@components/ServerSidebarIcon/index.svelte';
	import { event } from '@tauri-apps/api';
	import { onMount } from 'svelte';
	import './index.css';
	import type { PageData } from './$types';

	export let data: PageData;
	let servers: Server[] = [];

	onMount(() => {
		event.listen<Server[]>('ready', (event) => {
			servers = event.payload;
		});
	});
</script>

<div class="flex">
	<div class="server-sidebar-container">
		{#each servers as server}
			<ServerSidebarIcon
				href="/servers/{server._id}/channels/{server.channels[0]}"
				icon={server.icon === undefined ? undefined : getAutumnURL(server.icon)}
				tooltip={server.name}
				showIcon={!data.settings.lowDataMode}
			/>
		{/each}

		<div class="flex-1" />

		<ServerSidebarIcon href="/settings" icon="/gears.svg" tooltip="Settings" showIcon />
	</div>
	<slot />
</div>
