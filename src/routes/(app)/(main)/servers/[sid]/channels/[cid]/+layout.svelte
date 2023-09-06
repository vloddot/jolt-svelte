<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { RouteParams } from './$types';
	import { getContext, setContext } from '$lib/context';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import ChannelCategory from '@components/ChannelBar/Category.svelte';
	import { channelKey, serverKey } from './context';
	import { clientKey } from '@routes/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import UserProfilePicture from '@components/UserProfilePicture.svelte';

	const client = getContext(clientKey)!;

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
		server.set(await client.api.fetchServer(sid));
	}

	async function updateChannel(cid: string) {
		channel.set(await client.api.fetchChannel(cid));
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
			{#await client.api.fetchChannel(id) then channel}
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
		{#await client.api.fetchMembers($server._id) then response}
			{#each response.members as member}
				{@const user =
					response.users.find(({ _id }) => _id == member._id.user) ??
					client.api.fetchUser(member._id.user)}

				{#await user then user}
					{@const name = getDisplayName(user, member)}
					<div>
						<UserProfilePicture src={getDisplayAvatar(user, member)} {name} />

						{name}
					</div>
				{/await}
			{/each}
		{/await}
	</div>
{/if}
