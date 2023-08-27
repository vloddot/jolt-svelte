<script lang="ts">
	import { getContext } from '$lib/context';
	import { channelKey } from './context';
	import Chat from '@components/Chat/index.svelte';

	const channel = getContext(channelKey);
</script>

{#if $channel != undefined}
	{#if $channel.channel_type == 'VoiceChannel'}
		Voice Channels are not currently supported.
	{:else}
		<Chat channel={$channel} />
	{/if}
{/if}
