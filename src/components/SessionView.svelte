<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import { time } from 'svelte-i18n';
	import { decodeTime } from 'ulid';

	let sessionToView: SessionInfo;
	export { sessionToView as session };

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;

	$: isThisDevice = sessionToView._id == $session?._id;
</script>

<div class="w-full mx-auto" class:bg-blue-500={isThisDevice}>
	{#if isThisDevice}
		<h1 class="text-2xl uppercase">This Device</h1>
	{/if}

	<div class="flex">
		<h2 class="text-xl">{sessionToView.name.toUpperCase()}</h2>
		<p class="pl-2">Created <time>{$time(decodeTime(sessionToView._id))}</time>.</p>

		<div class="flex-1" />

		<button
			on:click={() => {
				if (isThisDevice) {
					client.destroy();
					session.set(null);
					return;
				}

				client.api.revokeSession(sessionToView._id);
			}}
		>
			Revoke
		</button>
	</div>
</div>
