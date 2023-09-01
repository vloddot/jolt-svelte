<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { RouteParams } from './$types';
	import { setContext } from '$lib/context';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import ChannelCategory from '@components/ChannelBar/Category.svelte';
	import MemberComponent from '@components/Member.svelte';
	import {
		fetchChannel,
		fetchMembersList,
		fetchServer,
		fetchUser,
		getDisplayAvatar,
		getDisplayName
	} from '$lib/util';
	import { channelKey, serverKey } from './context';

	const server = writable<Server | undefined>(undefined);
	const channel = writable<Channel | undefined>(undefined);

	setContext(serverKey, server);
	setContext(channelKey, channel);

	$: pageParams = $page.params as RouteParams;

	const selectedServerID = writable<string>();
	const selectedChannelID = writable<string>();

	setContext(selectedServerIDKey, selectedServerID);
	setContext(selectedChannelIDKey, selectedChannelID);

	$: selectedServerID.set(pageParams.sid);
	$: selectedChannelID.set(pageParams.cid);

	async function updateServer(sid: string) {
		server.set(await fetchServer(sid));
	}

	async function updateChannel(cid: string) {
		channel.set(await fetchChannel(cid));
	}

	$: updateServer($selectedServerID);
	$: updateChannel($selectedChannelID);
</script>

{#if $server != undefined}
	{@const categories = $server.categories ?? []}
	{@const unsortedChannels =
		$server.channels.filter(
			(channel) =>
				categories.find(
					(category) => channel != undefined && category.channels.includes(channel)
				) == undefined
		) ?? []}

	<div class="channel-bar-container">
		{#each unsortedChannels as id}
			{#await fetchChannel(id) then channel}
				<ChannelComponent {channel} />
			{/await}
		{/each}

		{#each categories as category}
			<ChannelCategory {category} let:channel>
				{#if channel != undefined}
					<ChannelComponent {channel} />
				{/if}
			</ChannelCategory>
		{/each}
	</div>
{/if}

<slot />

{#if $server != undefined}
	<div class="members-list-container">
		{#await fetchMembersList($server._id) then response}
			{#each response.members as member}
				{@const user =
					response.users.find(({ _id }) => _id == member._id.user) ?? fetchUser(member._id.user)}

				{#await user then user}
					<MemberComponent
						src={getDisplayAvatar(user, member)}
						displayName={getDisplayName(user, member)}
					/>
				{/await}
			{/each}
		{/await}
	</div>
{/if}
