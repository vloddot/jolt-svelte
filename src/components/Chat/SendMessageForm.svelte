<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayName } from '$lib/util';
	import { clientKey, settingsKey } from '@routes/context';
	import { channelKey, repliesKey } from '.';
	import PlusIcon from '@components/Icons/PlusIcon.svelte';

	const client = getContext(clientKey)!;
	const settings = getContext(settingsKey)!;
	const channel = getContext(channelKey)!;
	const replies = getContext(repliesKey)!;

	let channelName: string;
	let messageInput: string;
	let fileUploadNode: HTMLInputElement | null;
	let files: FileList | null;

	async function updateChannelName(channel: Channel) {
		if (
			channel.channel_type == 'TextChannel' ||
			channel.channel_type == 'VoiceChannel' ||
			channel.channel_type == 'Group'
		) {
			channelName = `#${channel.name}`;
			return;
		}

		if (channel.channel_type == 'SavedMessages') {
			channelName = 'Saved Notes';
			return;
		}

		try {
			channelName = `@${getDisplayName(
				await client.api.fetchUser(
					channel.recipients[0] == client.user?._id ? channel.recipients[1] : channel.recipients[0]
				)
			)}`;
		} catch (error) {
			channelName = 'Unknown Channel';
		}
	}

	function endTyping() {
		if ($settings['jolt:send-typing-indicators']) {
			client.websocket.send({ type: 'EndTyping', channel: channel._id });
		}
	}

	function startTyping() {
		if ($settings['jolt:send-typing-indicators']) {
			if (messageInput == '') {
				client.websocket.send({ type: 'EndTyping', channel: channel._id });
				return;
			}

			client.websocket.send({ type: 'BeginTyping', channel: channel._id });
		}
	}

	async function sendMessage() {
		let attachments: string[] = [];
		if (fileUploadNode?.files != null) {
			attachments = await Promise.all(
				Array.from(fileUploadNode.files).map((file) => client.autumn.uploadFile(file))
			);
			fileUploadNode.value = '';
			files = null;
		}

		await client.api.sendMessage(channel._id, {
			content: messageInput.trim(),
			replies: $replies.map(({ message: { _id }, mention }) => ({
				id: _id,
				mention
			})),
			attachments
		});

		replies.set([]);
		messageInput = '';
	}

	$: updateChannelName(channel);
</script>

<form id="message-send-form" on:submit={sendMessage}>
	<label for="file-upload" class="cursor-pointer">
		<PlusIcon />
	</label>
	<input id="file-upload" type="file" multiple max={5} bind:this={fileUploadNode} bind:files />
	<textarea
		on:blur={endTyping}
		on:input={startTyping}
		on:keydown={(event) => {
			if (event.shiftKey || event.key != 'Enter') {
				return;
			}

			event.preventDefault();
			sendMessage();
		}}
		bind:value={messageInput}
		maxlength="2000"
		placeholder="Send message in {channelName}"
	/>
</form>

<style lang="scss">
	form {
		display: flex;
		background-color: var(--message-box);
		border-radius: var(--border-radius);
		align-items: center;
		margin: 0px 16px 16px 16px;
		border-bottom: 2px solid var(--accent);

		input#file-upload {
			opacity: 0;
			width: 0px;
		}

		label[for='file-upload'] {
			cursor: pointer;
			margin-left: 16px;
		}

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
	}
</style>
