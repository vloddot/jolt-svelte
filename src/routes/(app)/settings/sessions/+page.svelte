<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import SessionView from '@components/SessionView.svelte';

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;
</script>

<div class="mr-2">
	<div class="my-4">
		{#if $session != null}
			<SessionView session={$session} />
		{/if}
	</div>

	{#await client.api.fetchSessions() then sessions}
		{#each sessions as sessionInfo}
			{#if sessionInfo._id != $session?._id}
				<SessionView session={sessionInfo} />
			{/if}
		{/each}
	{/await}

	<button on:click={() => client.api.revokeAllSessions(false)}>Revoke all other sessions</button>
</div>
