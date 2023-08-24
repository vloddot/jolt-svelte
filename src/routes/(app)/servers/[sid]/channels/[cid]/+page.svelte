<script lang="ts">
	import { setContext } from 'svelte';
	import type { RouteParams } from './$types';
	import { invoke } from '@tauri-apps/api';
	import ServerChannelBar from '@components/ChannelBar/index.svelte';
	import './index.css';
	import { page } from '$app/stores';
	import Chat from '@components/Chat/index.svelte';
	import { selectedChannelIDContext, selectedServerIDContext } from '$lib/context';
	import { writable } from 'svelte/store';
	import MembersListFetcher from '@components/MembersListFetcher.svelte';
	import MemberComponent from '@components/Member.svelte';
	import ArrayFind from '@components/ArrayFind.svelte';
	import { getAutumnURL, getDefaultUserAvatar } from '$lib/util';

	let server: Server | undefined = undefined;
	let channel: Channel | undefined = undefined;

	$: pageParams = $page.params as RouteParams;

	const selectedServerID = writable<string>();
	const selectedChannelID = writable<string>();

	setContext(selectedServerIDContext, selectedServerID);
	setContext(selectedChannelIDContext, selectedChannelID);

	$: selectedServerID.set(pageParams.sid);
	$: selectedChannelID.set(pageParams.cid);

	async function updateServerAndChannel(sid: string, cid: string) {
		[server, channel] = await Promise.all([
			invoke<Server>('fetch_server', { server_id: sid }),
			invoke<Channel>('fetch_channel', { channel_id: cid })
		]);
	}

	$: updateServerAndChannel($selectedServerID, $selectedChannelID);

	function getMemberAvatar(member: Member, user?: User): string {
		const avatar = member.avatar ?? user?.avatar;

		if (avatar !== undefined) {
			return getAutumnURL(avatar);
		}

		return getDefaultUserAvatar(member._id.user);
	}

	function getMemberDisplayName(member: Member, user?: User): string {
		return member.nickname ?? user?.username ?? '<Unknown User>';
	}
</script>

{#if server !== undefined}
	<ServerChannelBar {server} />

	{#if channel !== undefined}
		{#if channel.channel_type === 'VoiceChannel'}
			Voice Channels are not currently supported.
		{:else}
			<Chat {channel} />
			<div class="members-list-container">
				{#if channel.channel_type === 'TextChannel'}
					<MembersListFetcher server_id={server._id} let:response>
						{#if response !== undefined}
							{#each response.members as member}
								<ArrayFind
									array={response.users}
									predicate={(user) => user._id === member._id.user}
									let:item={user}
								>
									<MemberComponent
										src={getMemberAvatar(member, user)}
										displayName={getMemberDisplayName(member, user)}
									/>
								</ArrayFind>
							{/each}
						{/if}
					</MembersListFetcher>
				{/if}
			</div>
		{/if}
	{/if}
{/if}
