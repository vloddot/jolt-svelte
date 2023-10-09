<script lang="ts">
	import { page } from '$app/stores';
	import { getContext, setContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import ChannelCategory from '@components/ChannelBar/Category.svelte';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import { selectedChannelIDKey } from '@routes/(app)/context';
	import { clientKey, settingsKey } from '@routes/context';
	import { redirect } from '@sveltejs/kit';
	import { appWindow } from '@tauri-apps/api/window';
	import { writable } from 'svelte/store';
	import type { RouteParams } from './$types';
	import { channelKey } from './context';
	import { serverKey } from '../../context';
	import UserIcon from '@components/Icons/UserIcon.svelte';
	import { onDestroy } from 'svelte';

	const client = getContext(clientKey)!;
	const settings = getContext(settingsKey)!;
	const server = getContext(serverKey);

	$: pageParams = $page.params as RouteParams;

	const channel = writable<
		Extract<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined
	>();

	setContext(channelKey, channel);

	const selectedChannelID = getContext(selectedChannelIDKey) ?? writable(pageParams.cid);

	$: selectedChannelID.set(pageParams.cid);

	async function updateChannel(cid: string) {
		const result = await client.api.fetchChannel(cid);

		if (result.channel_type != 'TextChannel' && result.channel_type != 'VoiceChannel') {
			throw redirect(302, `/channels/${cid}`);
		}

		channel.set(result);
	}

	$: if ($selectedChannelID) updateChannel($selectedChannelID);

	$: {
		let title = '';

		if ($server == undefined) {
			title += 'Server';
		} else {
			title += $server.name;
		}

		if ($channel != undefined) {
			title += ` | #${$channel.name}`;
		}

		title += ' - Jolt';

		if ('__TAURI__' in window) {
			appWindow.setTitle(title);
		} else {
			document.title = title;
		}
	}

	onDestroy(() => {
		selectedChannelID.set(undefined);
	});
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
						{#if $settings['jolt:low-data-mode']}
							<UserIcon />
						{:else}
							{@const avatar = getDisplayAvatar(user, member)}
							{#if typeof avatar == 'string'}
								<img class="cover" src={avatar} alt={name} />
							{/if}
						{/if}

						{name}
					</div>
				{/await}
			{/each}
		{/await}
	</div>
{/if}

<style lang="scss">
	img.cover {
		width: 24px;
		height: 24px;
	}
</style>
