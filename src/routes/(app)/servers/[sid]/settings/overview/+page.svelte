<script lang="ts">
	import { getContext } from '$lib/context';
	import InputSetting from '@components/Settings/InputSetting.svelte';
	import { serverKey } from '@routes/(app)/servers/[sid]/context';
	import { clientKey } from '@routes/context';

	const server = getContext(serverKey);
	const client = getContext(clientKey)!;

	let name: string;
	let description: string;

	server?.subscribe((server) => {
		if (server == undefined) {
			return;
		}

		name = server.name;
		description = server.description ?? '';
	});

	function submit() {
		if ($server == undefined) {
			return;
		}

		client.api.editServer($server._id, {
			name,
			description
		});
	}
</script>

<form class="main-content-container" on:submit|preventDefault={submit}>
	<h1 class="text-xl uppercase">Server Name</h1>
	<InputSetting type="text" bind:value={name} />

	<h1 class="text-xl uppercase">Server Description</h1>
	<InputSetting
		type="textarea"
		bind:value={description}
		placeholder="Write something about {$server?.name ?? 'this server'}..."
	/>

	<button type="submit">Submit</button>
</form>
