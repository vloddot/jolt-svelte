<script lang="ts">
	import { getContext } from '$lib/context';
	import TextChat from '@components/Chat/TextChat.svelte';
	import VoiceChat from '@components/Chat/VoiceChat.svelte';
	import { selectedChannelKey } from '@routes/(app)/context';

	const channel = getContext(selectedChannelKey);
</script>

{#if $channel != undefined}
	{#if $channel.channel_type == 'VoiceChannel'}
		<VoiceChat />
	{:else}
		<TextChat />
	{/if}
{/if}
