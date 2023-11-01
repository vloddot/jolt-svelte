<script lang="ts">
	import { mapById } from '$lib/client/util';
	import { getContext } from '$lib/context';
	import UserButton from '@components/User/UserButton.svelte';
	import { clientKey } from '@routes/context';

	export let server: Server;

	const client = getContext(clientKey)!;

	let promise = Promise.resolve({
		members: new Array<Member>(),
		users: new Map<User['_id'], User>()
	});

	async function updateMembers(server: string) {
		promise = new Promise((resolve, reject) => {
			client.api
				.fetchMembers(server)
				.then((response) => {
					const users = mapById<string, User>(response.users);

					resolve({
						members:
							response.members.length < 10_000
								? response.members
								: response.members.filter((member) => users.get(member._id.user)?.online),
						users
					});
				})
				.catch(reject);
		});
	}

	$: updateMembers(server._id);
</script>

<div class="members-list-container">
	{#await promise}
		Loading...
	{:then response}
		{#each response.members as member}
			{@const user = response.users.get(member._id.user)}

			{#if user != undefined}
				<UserButton {user} {member} />
			{/if}
		{/each}
	{/await}
</div>

<style lang="scss">
	.members-list-container {
		padding-top: 8px;
	}
</style>
