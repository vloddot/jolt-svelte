<script lang="ts">
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';
	import { redirect } from '@sveltejs/kit';
	import Chat from '@components/Chat/index.svelte';
	import Member from '@components/Member.svelte';
	import { fetchChannel, fetchUser, getDisplayAvatar, getDisplayName } from '$lib/util';

	$: pageParams = $page.params as RouteParams;

	let channel: Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined =
		undefined;

	async function updateChannel(channel_id: string) {
		const result = await fetchChannel(channel_id);

		if (result.channel_type == 'TextChannel' || result.channel_type == 'VoiceChannel') {
			throw redirect(302, `/servers/${result.server}/channels/${pageParams.id}`);
		}

		channel = result;
	}

	$: updateChannel(pageParams.id);
</script>

{#if channel != undefined}
	<Chat {channel} />

	{#if channel.channel_type == 'Group' || channel.channel_type == 'DirectMessage'}
		{#await Promise.all(channel.recipients.map((id) => fetchUser(id))) then recipients}
			<div class="members-list-container">
				{#each recipients as recipient}
					<Member src={getDisplayAvatar(recipient)} displayName={getDisplayName(recipient)} />
				{/each}
			</div>
		{/await}
	{/if}
{/if}
