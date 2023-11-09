<script lang="ts">
	import { getContext } from '$lib/context';
	import { selectedChannelKey } from '@routes/(app)/context';
	import { clientKey } from '@routes/context';

	const client = getContext(clientKey)!;
	const channel = getContext(selectedChannelKey)!;

	export let placeholder: string | undefined = undefined;
	export let value = '';
	export let sendTypingEvents: boolean;

	function endTyping() {
		if (!sendTypingEvents || $channel == undefined) return;

		client.websocket.send({ type: 'EndTyping', channel: $channel._id });
	}

	function startTyping() {
		if (!sendTypingEvents || $channel == undefined) return;

		if (value == '') {
			endTyping();
			return;
		}

		client.websocket.send({ type: 'BeginTyping', channel: $channel._id });
	}
</script>

<textarea
	on:blur={endTyping}
	on:input={startTyping}
	on:keydown={(event) => {
		if (event.shiftKey || event.key != 'Enter') {
			return;
		}

		event.preventDefault();
		event.currentTarget.form?.requestSubmit();
	}}
	bind:value
	maxlength="2000"
	{placeholder}
/>

<style lang="scss">
	textarea {
		resize: none;
		background-color: transparent;
		font-family: inherit;
		width: 100%;
		line-height: 20px;
		height: auto;
		height: 20px;
		padding: 14px 14px 14px 0;
	}
</style>
