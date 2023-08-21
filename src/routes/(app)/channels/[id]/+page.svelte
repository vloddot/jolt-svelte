<script lang="ts">
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';
	import { invoke } from '@tauri-apps/api';
	import { redirect } from '@sveltejs/kit';
	import Chat from '@components/Chat/index.svelte';
	import DirectMessages from '@components/ChannelBar/DirectMessages.svelte';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { selectedChannelIDKey } from '$lib/context';
	import UserFetcher from '@components/UserFetcher.svelte';
	import Member from '@components/Member.svelte';
	import { getAutumnURL, getDefaultUserAvatar } from '$lib/util';

	$: pageParams = $page.params as RouteParams;

	const selectedChannelID = writable<string>();
	setContext(selectedChannelIDKey, selectedChannelID);

	let channel: Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined =
		undefined;

	async function updateChannel(channel_id: string) {
		const result = await invoke<Channel>('fetch_channel', { channel_id });

		if (result.channel_type === 'TextChannel' || result.channel_type === 'VoiceChannel') {
			throw redirect(302, `/servers/${result.server}/channels/${pageParams.id}`);
		}

		selectedChannelID?.set(channel_id);
		channel = result;
	}

	$: updateChannel(pageParams.id);
</script>

<DirectMessages />

{#if channel !== undefined}
	<Chat {channel} />

	{#if channel.channel_type === 'Group' || channel.channel_type === 'DirectMessage'}
		<UserFetcher ids={channel.recipients} let:users={recipients}>
			{#if recipients !== undefined}
				<div class="members-list-container">
					{#each recipients as recipient}
						<Member
							src={recipient.avatar === undefined
								? getDefaultUserAvatar(recipient._id)
								: getAutumnURL(recipient.avatar)}
								displayName={recipient.username}
						/>
					{/each}
				</div>
			{/if}
		</UserFetcher>
	{/if}
{/if}
