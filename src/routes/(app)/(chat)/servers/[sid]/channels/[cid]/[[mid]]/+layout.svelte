<script lang="ts">
	import { page } from '$app/stores';
	import { getContext, setContext } from '$lib/context';
	import ChannelCategory from '@components/ChannelBar/Category.svelte';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import { clientKey } from '@routes/context';
	import { appWindow } from '@tauri-apps/api/window';
	import type { RouteParams } from './$types';
	import { nearbyMessageKey } from '@components/Chat';
	import { selectedChannelKey, selectedServerKey } from '@routes/(app)/context';
	import UserButton from '@components/User/UserButton.svelte';

	const client = getContext(clientKey)!;
	const channel = getContext(selectedChannelKey)!;
	const selectedServer = getContext(selectedServerKey);

	$: pageParams = $page.params as RouteParams;
	$: {
		let title = 'Jolt - ';

		if ($selectedServer == undefined) {
			title += 'Server';
		} else {
			title += $selectedServer.name;
		}

		if (
			$channel != undefined &&
			$channel.channel_type != 'DirectMessage' &&
			$channel.channel_type != 'SavedMessages'
		) {
			title += ` | #${$channel.name}`;
		}

		if ('__TAURI__' in window) {
			appWindow.setTitle(title);
		} else {
			document.title = title;
		}
	}

	$: {
		const element = document.getElementById(`MESSAGE-${pageParams.mid}`);

		if (element == null) {
			setContext(nearbyMessageKey, pageParams.mid);
		} else {
			element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			element.animate(
				[
					{ backgroundColor: 'var(--mention)' },
					{ backgroundColor: 'var(--mention)', offset: 0.6 },
					{ backgroundColor: 'transparent' }
				],
				{
					duration: 3000,
					iterations: 1,
					easing: 'ease'
				}
			);
		}
	}
</script>

{#if $selectedServer != undefined}
	{@const categories = $selectedServer.categories ?? []}
	{@const unsortedChannels =
		$selectedServer.channels.filter(
			(channel) =>
				categories.find(
					(category) => channel != undefined && category.channels.includes(channel)
				) == undefined
		) ?? []}

	<div class="channel-bar-container">
		{#each unsortedChannels as id}
			{#await client.fetchChannel(id) then channel}
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

{#if $selectedServer != undefined}
	<div class="members-list-container">
		{#await client.fetchMembers($selectedServer._id)}
			Loading...
		{:then response}
			{#each response.members as member}
				{@const user = response.users.get(member._id.user)}

				{#if user != undefined}
					<UserButton {user} {member} />
				{/if}
			{/each}
		{/await}
	</div>
{/if}
