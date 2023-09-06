<script lang="ts">
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';
	import Chat from '@components/Chat/index.svelte';
	import UserDetail from '@components/UserDetail.svelte';
	import { clientKey, sessionKey } from '@routes/context';
	import { getContext } from '$lib/context';
	import { redirect } from '@sveltejs/kit';

	$: pageParams = $page.params as RouteParams;

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;

	let channel: Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined =
		undefined;

	async function updateChannel(channel_id: string) {
		const result = await client.api.fetchChannel(channel_id);

		if (result.channel_type == 'TextChannel' || result.channel_type == 'VoiceChannel') {
			throw redirect(302, `/servers/${result.server}/channels/${pageParams.id}`);
		}

		channel = result;
	}

	$: updateChannel(pageParams.id);
</script>

{#if channel != undefined}
	<Chat {channel} />

	{#if channel.channel_type != 'SavedMessages'}
		{#await client.api.fetchUser(channel.recipients[0] == $session.user_id ? channel.recipients[1] : channel.recipients[0]) then user}
			<div class="members-list-container">
				<UserDetail {user} />
			</div>
		{/await}
	{/if}
{/if}
