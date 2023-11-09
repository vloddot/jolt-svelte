<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import SessionView from '@components/SessionView.svelte';

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;

	let sessions = new Array<SessionInfo>();

	async function updateSessions(promise: Promise<SessionInfo[]>) {
		sessions = await promise;
	}

	$: sessionFetchPromise = client.fetchSessions();
	$: updateSessions(sessionFetchPromise);
</script>

<div class="mr-2">
	<div class="my-4">
		{#if $session != null}
			<SessionView
				session={$session}
				on:click={() => {
					client.destroy();
					session.set(null);
				}}
				isThisDevice
			/>
		{/if}
	</div>

	{#await sessionFetchPromise}
		<p>Loading...</p>
	{:then}
		{#each sessions as sessionInfo}
			{#if sessionInfo._id != $session?._id}
				<SessionView
					session={sessionInfo}
					on:click={() => {
						client.revokeSession(sessionInfo._id);
						sessions = sessions.filter((session) => session._id != sessionInfo._id);
					}}
				/>
			{/if}
		{/each}
	{/await}

	<button on:click={() => client.revokeAllSessions(false)}>Revoke all other sessions</button>
</div>
