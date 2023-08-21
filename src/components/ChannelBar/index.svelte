<script lang="ts">
	import ChannelFetcher from '@components/ChannelFetcher.svelte';
	import Channel from './Channel.svelte';
	import ChannelCategory from './Category.svelte';

	export let server: Server;

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
