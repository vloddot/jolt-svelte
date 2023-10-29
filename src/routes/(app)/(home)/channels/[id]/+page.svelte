<script lang="ts">
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';
	import Chat from '@components/Chat/TextChat.svelte';
	import UserDetail from '@components/UserDetail.svelte';
	import { clientKey } from '@routes/context';
	import { getContext } from '$lib/context';
	import { redirect } from '@sveltejs/kit';
	import { getDisplayName } from '$lib/util';

	import { appWindow } from '@tauri-apps/api/window';
	import { onDestroy } from 'svelte';
	import { selectedChannelIDKey } from '@routes/(app)/context';

	$: pageParams = $page.params as RouteParams;

	const client = getContext(clientKey)!;
	const selectedChannelID = getContext(selectedChannelIDKey);

	let channel: Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined =
		undefined;

	let user: User | undefined;

	async function updateChannel(channel_id: string) {
		const result = await client.api.fetchChannel(channel_id);

		if (result.channel_type == 'TextChannel' || result.channel_type == 'VoiceChannel') {
			throw redirect(302, `/servers/${result.server}/channels/${pageParams.id}`);
		}

		channel = result;
	}

	async function updateUser(
		channel: Extract<Channel, { channel_type: 'DirectMessage' | 'Group' }>
	) {
		user = await client.api.fetchUser(
			channel.recipients[0] == client.user?._id ? channel.recipients[1] : channel.recipients[0]
		);
	}

	$: selectedChannelID?.set(pageParams.id);
	$: if ($selectedChannelID) updateChannel($selectedChannelID);
	$: if (channel != undefined && channel.channel_type != 'SavedMessages') updateUser(channel);

	$: {
		let title = 'Jolt - ';
		if (channel?.channel_type == 'SavedMessages') {
			title += 'Saved Messages';
		} else if (user == undefined) {
			title += 'DM';
		} else {
			title += `DM with ${getDisplayName(user)}`;
		}

		if ('__TAURI__' in window) {
			appWindow.setTitle(title);
		} else {
			document.title = title;
		}
	}

	onDestroy(() => {
		selectedChannelID?.set(undefined);
	});
</script>

{#if channel != undefined}
	<Chat {channel} />

	{#if channel.channel_type != 'SavedMessages'}
		{#if user != undefined}
			<div class="members-list-container">
				<UserDetail {user} />
			</div>
		{/if}
	{/if}
{/if}
