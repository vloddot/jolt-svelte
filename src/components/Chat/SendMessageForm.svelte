<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayName } from '$lib/util';
	import { clientKey, settingsKey } from '@routes/context';

	import { channelKey, repliesKey } from '.';
	import Plus from '$lib/icons/plus.svg';

	const client = getContext(clientKey)!;
	const settings = getContext(settingsKey)!;
	const channel = getContext(channelKey)!;
	const replies = getContext(repliesKey)!;

	let channelName: string;
	let messageInputNode: HTMLTextAreaElement;
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
			if (messageInputNode.value == '') {
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
			content: messageInputNode.value.trim(),
			replies: $replies.map(({ message: { _id }, mention }) => ({
				id: _id,
				mention
			})),
			attachments
		});

		replies.set([]);
		messageInputNode.value = '';
	}

	$: updateChannelName(channel);
</script>

<form
	id="message-send-form"
	on:submit={sendMessage}
	class="flex bg-gray-500 rounded-xl px-2 pt-2 m-4"
>
	<label for="file-upload" class="cursor-pointer">
		<img src={Plus} alt="Upload File" />
	</label>
	<input
		id="file-upload"
		class="opacity-0 w-0 p-1"
		type="file"
		multiple
		max={5}
		bind:this={fileUploadNode}
		bind:files
	/>
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
		bind:this={messageInputNode}
		maxlength="2000"
		class="outline-none resize-none bg-inherit w-full h-12"
		placeholder="Send message in {channelName}"
	/>
</form>
