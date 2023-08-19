<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData, RouteParams } from './$types';
	import { invoke } from '@tauri-apps/api';
	import ChannelBar from '@components/ChannelBar/index.svelte';
	import './index.css';
	import { page } from '$app/stores';
	import Chat from '@components/Chat/index.svelte';

	export let data: PageData;
	let server: Server | undefined;
	let channel: Channel | undefined;

	$: pageParams = $page.params as RouteParams;

	onMount(async () => {
		[server, channel] = await Promise.all([
			invoke<Server>('fetch_server', { server_id: pageParams.sid }),
			invoke<Channel>('fetch_channel', { channel_id: pageParams.cid })
		]);
	});
</script>

{#if server !== undefined}
	<ChannelBar {server} user_id={data.session.user_id} lowDataMode={data.settings.lowDataMode} />
{/if}

{#if channel !== undefined}
	{#if channel.channel_type === 'VoiceChannel'}
		Voice Channels are not currently supported.
	{:else}
		<Chat {channel} lowDataMode={data.settings.lowDataMode} sessionUID={data.session.user_id} />
	{/if}
{/if}
