<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import UserProfilePicture from '@components/UserProfilePicture.svelte';
	import { clientKey } from '@routes/context';

	const client = getContext(clientKey)!;
	let list = Array.from(client.api.cache.users.values()).filter(
		(user) =>
			user.relationship != undefined &&
			['Outgoing', 'Incoming', 'Blocked', 'BlockedOther', 'Friend'].includes(user.relationship)
	);

	$: categories = [
		{
			title: 'Outgoing',
			list: list.filter((user) => user.relationship == 'Outgoing')
		},
		{
			title: 'Incoming',
			list: list.filter((user) => user.relationship == 'Incoming')
		},
		{
			title: 'Online',
			list: list.filter((user) => user.relationship == 'Friend' && user.online)
		},
		{
			title: 'Offline',
			list: list.filter((user) => user.relationship == 'Friend' && !user.online)
		},
		{
			title: 'Blocked',
			list: list.filter((user) => user.relationship == 'Blocked')
		}
	];
</script>

<main class="main-content-container">
	{#each categories as { title, list }}
		{#if list.length != 0}
			<h1 class="uppercase">{title} -- {list.length}</h1>

			{#each list as user}
				{@const name = getDisplayName(user)}
				<div class="flex p-2">
					<UserProfilePicture {name} src={getDisplayAvatar(user)} width={64} height={64} />

					{name}
				</div>
			{/each}
		{/if}
	{/each}
</main>
