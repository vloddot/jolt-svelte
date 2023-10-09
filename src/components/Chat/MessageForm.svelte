<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import { channelKey } from '.';
	import { createEventDispatcher } from 'svelte';

	const client = getContext(clientKey)!;
	const channel = getContext(channelKey)!;

	export let placeholder: string | undefined = undefined;
	export let value = '';
	export let sendTypingEvents: boolean;
	const dispatch = createEventDispatcher();

	function endTyping() {
		if (!sendTypingEvents) return;

		client.websocket.send({ type: 'EndTyping', channel: channel._id });
	}

	function startTyping() {
		if (!sendTypingEvents) return;

		if (value == '') {
			client.websocket.send({ type: 'EndTyping', channel: channel._id });
			return;
		}

		client.websocket.send({ type: 'BeginTyping', channel: channel._id });
	}
</script>

<textarea
	on:blur={endTyping}
	on:input={startTyping}
	on:keydown={(event) => {
		dispatch('keydown', event);
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
	// form {
	// 	display: flex;
	// 	background-color: var(--message-box);
	// 	border-radius: var(--border-radius);
	// 	align-items: center;
	// 	margin: 0px 16px 16px 16px;
	// 	border-bottom: 2px solid var(--accent);

	// 	input#file-upload {
	// 		opacity: 0;
	// 		width: 0px;
	// 	}

	// 	label[for='file-upload'] {
	// 		cursor: pointer;
	// 		margin-left: 16px;
	// 	}

	// }
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
