<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import { appWindow } from '@tauri-apps/api/window';

	const client = getContext(clientKey)!;

	let name = '';
	let description = '';
	let nsfw = false;

	let error: string | undefined;

	async function createServer() {
		if (name == '') {
			error = 'Server name is required.';
			return;
		}

		const { server, channels } = await client.createServer({
			name,
			description: description == '' ? undefined : description,
			nsfw
		});

		await goto(`${base}/servers/${server._id}/channels/${channels[0]._id}`);
	}

	const TITLE = 'Jolt - Create Server';
	$: {
		if ('__TAURI__' in window) {
			appWindow.setTitle(TITLE);
		}
	}
</script>

<main class="main-content-container">
	<div class="modal">
		<form id="create-server-form" class="modal-base" on:submit|preventDefault={createServer}>
			<h1>Create Server</h1>

			<input type="text" placeholder="What do you want to name your server?" bind:value={name} />

			<textarea placeholder="Describe your server (Optional)" bind:value={description} />

			<p>
				Markdown in the server description is supported.
				<a href="https://developers.revolt.chat/markdown" target="_blank" rel="nonreferrer"
					>Learn more here</a
				>.
			</p>

			<span class="flex justify-center">
				<label class="pr-2" for="nsfw">Is your server NSFW?</label>
				<input type="checkbox" name="nsfw" bind:checked={nsfw} />
			</span>

			<button type="submit">Create Server</button>
		</form>

		{#if error}
			<p>{error}</p>
		{/if}
	</div>
</main>

<svelte:head>
	<title>{TITLE}</title>
</svelte:head>

<style lang="scss">
	.main-content-container {
		background-color: var(--secondary-background);
	}

	textarea {
		resize: vertical;
	}

	a {
		color: var(--accent);
	}
</style>
