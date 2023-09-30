<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayName } from '$lib/util';
	import RoundedImage from '@components/RoundedImage.svelte';
	import type { VoiceParticipant } from '@revkit/voice';
	import { voiceClientKey } from '@routes/context';
	import Phone from '$lib/icons/phone.svg';

	export let channel: Extract<Channel, { channel_type: 'VoiceChannel' }>;

	const voice = getContext(voiceClientKey)!;

	let participants = new Map<string, VoiceParticipant>();

	$voice.participants.onUpdate(() => (participants = $voice.participants));

	function connect() {
		Promise.all([
			navigator.mediaDevices.getUserMedia({
				audio: true
			}),
			$voice.connect(channel._id)
		]).then(([stream]) => {
			const track = stream.getAudioTracks()[0];
			$voice.play('audio', track);
		});
	}
</script>

<div class="main-content-container">
	<button class="m-2" on:click={() => ($voice.connected ? $voice.disconnect() : connect())}>
		<img src={Phone} alt={$voice.connected ? 'Leave Call' : 'Join Call'} width={24} height={24} />
	</button>

	<div class="flex justify-center">
		{#each participants.values() as { user }}
			{@const name = getDisplayName(user)}
			<div class="flex flex-col m-2">
				<RoundedImage
					{name}
					src={user.generateAvatarURL({ max_side: 256 })}
					width={100}
					height={100}
					inline={false}
				/>
				<span class="align-center text-sm">{name}</span>
			</div>
		{/each}
	</div>
</div>
