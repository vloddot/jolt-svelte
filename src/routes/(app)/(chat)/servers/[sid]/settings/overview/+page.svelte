<script lang="ts">
	import { getContext } from '$lib/context';
	import InputSetting from '@components/Settings/InputSetting.svelte';
	import { selectedServerKey } from '@routes/(app)/context';
	import { clientKey } from '@routes/context';

	const selectedServer = getContext(selectedServerKey)!;
	const client = getContext(clientKey)!;

	let name: string;
	let description: string;

	selectedServer.subscribe((server) => {
		if (server == undefined) {
			return;
		}

		name = server.name;
		description = server.description ?? '';
	});

	function submit() {
		if ($selectedServer == undefined) {
			return;
		}

		client.editServer($selectedServer._id, {
			name,
			description
		});
	}
</script>

<form id="edit-server-form" on:submit|preventDefault={submit}>
	<h1 class="text-xl uppercase">Server Name</h1>
	<InputSetting type="text" bind:value={name} />

	<h1 class="text-xl uppercase">Server Description</h1>

	<InputSetting
		type="textarea"
		bind:value={description}
		placeholder="Write something about {$selectedServer?.name ?? 'this server'}..."
	/>

	<button type="submit">Submit</button>
</form>
