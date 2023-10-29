<script lang="ts">
	import { page } from '$app/stores';
	import { getContext, setContext } from '$lib/context';
	import ChannelCategory from '@components/ChannelBar/Category.svelte';
	import ChannelComponent from '@components/ChannelBar/Channel.svelte';
	import { selectedChannelIDKey } from '@routes/(app)/context';
	import { clientKey } from '@routes/context';
	import { redirect } from '@sveltejs/kit';
	import { appWindow } from '@tauri-apps/api/window';
	import { writable } from 'svelte/store';
	import type { RouteParams } from './$types';
	import { channelKey } from './context';
	import { serverKey } from '@routes/(app)/servers/[sid]/context';
	import { onDestroy } from 'svelte';
	import { nearbyMessageKey } from '@components/Chat';

	const client = getContext(clientKey)!;
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
		let title = 'Jolt - ';

		if ($server == undefined) {
			title += 'Server';
		} else {
			title += $server.name;
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
