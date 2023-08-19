<script lang="ts">
	import ChannelFetcher from '@components/ChannelFetcher.svelte';
	import Channel from './Channel.svelte';
	import ChannelCategory from './Category.svelte';
	import { setContext } from 'svelte';
	import { lowDataModeKey, serverIDKey, userIDKey } from '.';

	export let server: Server;
	export let user_id: string;
	export let lowDataMode: boolean;

	setContext(userIDKey, user_id);
	setContext(serverIDKey, server?._id);
	setContext(lowDataModeKey, lowDataMode);

	$: categories = server.categories ?? [];
	$: unsortedChannels =
		server.channels.filter(
			(channel) =>
				categories.find(
					(category) => channel !== undefined && !category.channels.includes(channel)
				) === undefined
		) ?? [];
</script>

<div class="channel-bar-container">
	{#each unsortedChannels as channel}
		{#if channel !== undefined}
			<ChannelFetcher ids={[channel]} let:channels={[channel]}>
				{#if channel !== undefined}
					<Channel {channel} />
				{/if}
			</ChannelFetcher>
		{/if}
	{/each}

	{#each categories as category}
		<ChannelCategory {category} let:channel>
			{#if channel !== undefined}
				<Channel {channel} />
			{/if}
		</ChannelCategory>
	{/each}
</div>
