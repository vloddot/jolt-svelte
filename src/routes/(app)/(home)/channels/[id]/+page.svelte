<script lang="ts">
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';
	import Chat from '@components/Chat/index.svelte';
	import UserDetail from '@components/UserDetail.svelte';
	import { clientKey, sessionKey } from '@routes/context';
	import { getContext } from '$lib/context';
	import { redirect } from '@sveltejs/kit';
	import { getDisplayName } from '$lib/util';
	import { _ } from 'svelte-i18n';
	import { appWindow } from '@tauri-apps/api/window';

	$: pageParams = $page.params as RouteParams;

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;

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
			channel.recipients[0] == $session.user_id ? channel.recipients[1] : channel.recipients[0]
		);
	}

	$: updateChannel(pageParams.id);
	$: channel != undefined && channel.channel_type != 'SavedMessages' && updateUser(channel);
	$: {
		let title = 'Jolt';
		if (channel?.channel_type == 'SavedMessages') {
			title += ` - ${$_('channel.notes')}`;
		} else if (user == undefined) {
			title += ` - ${$_('channel.dm.title')}`;
		} else {
			title += ` - ${$_('channel.dm.with')} ${getDisplayName(user)}`;
		}

		if ('__TAURI__' in window) {
			appWindow.setTitle(title);
		} else {
			document.title = title;
		}
	}
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
