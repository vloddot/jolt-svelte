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
	import { redirect } from '@sveltejs/kit';
	import { appWindow } from '@tauri-apps/api/window';

	const client = getContext(clientKey)!;

	$: pageParams = $page.params as RouteParams;

	const server = writable<Server | undefined>();
	const channel = writable<
		Extract<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined
	>();

	setContext(serverKey, server);
	setContext(channelKey, channel);

	const selectedServerID = getContext(selectedServerIDKey) ?? writable(pageParams.sid);
	const selectedChannelID = getContext(selectedChannelIDKey) ?? writable(pageParams.cid);

	$: selectedServerID.set(pageParams.sid);
	$: selectedChannelID.set(pageParams.cid);

	async function updateServer(sid: string) {
		server.set(await client.api.fetchServer(sid));
	}

	async function updateChannel(cid: string) {
		const result = await client.api.fetchChannel(cid);

		if (result.channel_type != 'TextChannel' && result.channel_type != 'VoiceChannel') {
			throw redirect(302, `/channels/${cid}`);
		}

		channel.set(result);
	}

	$: if ($selectedServerID) updateServer($selectedServerID);
	$: if ($selectedChannelID) updateChannel($selectedChannelID);

	$: {
		let title = 'Jolt';

		if ($server != undefined) {
			title += ` - ${$server.name}`;
		}

		if ($channel != undefined) {
			title += ` | #${$channel.name}`;
		}

		if ('__TAURI__' in window) {
			appWindow.setTitle(title);
		} else {
			document.title = title;
		}
	}
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
