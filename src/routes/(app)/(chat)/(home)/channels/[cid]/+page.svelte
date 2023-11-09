<script lang="ts">
	import TextChat from '@components/Chat/TextChat.svelte';
	import UserDetail from '@components/UserDetail.svelte';
	import { clientKey } from '@routes/context';
	import { getContext } from '$lib/context';

	import { appWindow } from '@tauri-apps/api/window';
	import { selectedChannelKey } from '@routes/(app)/context';
	import UserButton from '@components/User/UserButton.svelte';

	const client = getContext(clientKey)!;
	const channel = getContext(selectedChannelKey)!;

	function getOtherRecipient(
		channel: Extract<Channel, { channel_type: 'DirectMessage' }>
	): Promise<User> {
		return new Promise((resolve, reject) => {
			const other = channel.recipients.find((recipient) => client.user?._id != recipient);
			if (other == undefined) {
				reject();
				return;
			}

			client.fetchUser(other).then(resolve).catch(reject);
			return;
		});
	}

	$: {
		let title = 'Jolt - ';
		if ($channel?.channel_type == 'SavedMessages') {
			title += 'Saved Messages';
		} else if ($channel?.channel_type == 'Group') {
			title += $channel.name;
		}

		if ('__TAURI__' in window) {
			appWindow.setTitle(title);
		} else {
			document.title = title;
		}
	}
</script>

{#if channel != undefined}
	<TextChat />

	{#if $channel?.channel_type == 'DirectMessage'}
		{#await getOtherRecipient($channel)}
			Loading...
		{:then recipient}
			<div class="members-list-container">
				<UserDetail user={recipient} />
			</div>
		{:catch}
			Failed to load user detail. See console for more info.
		{/await}
	{:else if $channel?.channel_type == 'Group'}
		<div class="members-list-container">
			{#each $channel.recipients as recipient}
				{#await client.fetchUser(recipient) then user}
					<UserButton {user} />
				{/await}
			{/each}
		</div>
	{/if}1
{/if}
