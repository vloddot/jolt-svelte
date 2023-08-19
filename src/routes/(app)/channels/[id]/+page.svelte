<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData, RouteParams } from './$types';
	import { invoke } from '@tauri-apps/api';
	import { redirect } from '@sveltejs/kit';
	import Chat from '@components/Chat/index.svelte';
	import DirectMessages from '@components/ChannelBar/DirectMessages.svelte';

	export let data: PageData;

	$: pageParams = $page.params as RouteParams;
	$: updateChannel(pageParams.id);

	let channel: Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined;

	async function updateChannel(channel_id: string) {
		const result = await invoke<Channel>('fetch_channel', { channel_id });

		if (result.channel_type === 'TextChannel' || result.channel_type === 'VoiceChannel') {
			throw redirect(302, `/servers/${result.server}/${pageParams.id}`);
		}

		channel = result;
	}
</script>

<DirectMessages userID={data.session.user_id} lowDataMode={data.settings.lowDataMode} />

{#if channel !== undefined}
	<Chat {channel} sessionUID={data.session.user_id} lowDataMode={data.settings.lowDataMode} />
{/if}
