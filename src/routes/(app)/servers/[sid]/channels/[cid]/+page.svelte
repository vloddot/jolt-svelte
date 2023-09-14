<script lang="ts">
	import { getContext } from '$lib/context';
	import Chat from '@components/Chat/index.svelte';
	import VoiceChat from '@components/Chat/VoiceChat.svelte';
	import { channelKey } from './context';

	const channel = getContext(channelKey);
</script>

{#if $channel != undefined}
	{#if $channel.channel_type == 'VoiceChannel'}
		<VoiceChat channel={$channel} />
	{:else}
		<Chat channel={$channel} />
	{/if}
{/if}
