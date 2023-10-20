<script lang="ts">
	import { getContext } from '$lib/context';
	import TextChat from '@components/Chat/TextChat.svelte';
	import VoiceChat from '@components/Chat/VoiceChat.svelte';
	import { channelKey } from './context';

	const channel = getContext(channelKey);
</script>

{#if $channel != undefined}
	{#if $channel.channel_type == 'VoiceChannel'}
		<VoiceChat channel={$channel} />
	{:else}
		<TextChat channel={$channel} />
	{/if}
{/if}
