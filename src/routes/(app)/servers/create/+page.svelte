<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import { appWindow } from '@tauri-apps/api/window';
	import { _ } from 'svelte-i18n';

	const client = getContext(clientKey)!;

	let name: string = '';
	let description: string = '';
	let nsfw: boolean = false;

	let error: string | undefined;

	async function createServer() {
		if (name == '') {
			error = 'Server name is required.';
			return;
		}

		const { server, channels } = await client.api.createServer({
			name,
			description: description == '' ? undefined : description,
			nsfw
		});

		await goto(`${base}/servers/${server._id}/channels/${channels[0]._id}`);
	}

	const TITLE = 'Create Server - Jolt';
	$: {
		if ('__TAURI__' in window) {
			appWindow.setTitle(TITLE);
		}
	}
</script>

<!-- TODO: should be populated with things, currently a placeholder to make the main content on the center -->
<div class="channel-bar-container"></div>

<main class="main-content-container">
	<div class="w-full h-full flex items-center flex-col justify-center relative">
		<div
			class="rounded-xl relative items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-6 py-12 w-[90%] mb-auto"
		>
			<form class="flex flex-col" on:submit|preventDefault={createServer}>
				<h1 class="text-3xl">{$_('server.create')}</h1>

				<input
					class="bg-gray-500 mb-3 rounded-md"
					type="text"
					placeholder="What do you want to name your server?"
					bind:value={name}
				/>

				<div class="bg-gray-500 rounded-xl pt-2 px-2">
					<textarea
						class="outline-none bg-inherit w-full"
						placeholder="Describe your server (Optional)"
						bind:value={description}
					/>
				</div>

				<span class="flex justify-center">
					<label class="pr-2" for="nsfw">Is your server NSFW?</label>
					<input type="checkbox" name="nsfw" bind:checked={nsfw} />
				</span>

				<button type="submit">{$_('server.create')}</button>
			</form>

			{#if error}
				<p>{error}</p>
			{/if}
		</div>
	</div>
</main>

<svelte:head>
	<title>{TITLE}</title>
</svelte:head>
