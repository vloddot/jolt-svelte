<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import CheckIcon from '@components/Icons/CheckIcon.svelte';
	import EnvelopeIcon from '@components/Icons/EnvelopeIcon.svelte';
	import GenericUserIcon from '@components/Icons/GenericUserIcon.svelte';
	import XMarkIcon from '@components/Icons/XMarkIcon.svelte';
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
				{@const avatar = getDisplayAvatar(user)}
				<div class="flex">
					<div class="p-2">
						{#if avatar != undefined}
							<img class="cover" alt={name} src={avatar} width="64px" height="64px" />
						{:else}
							<GenericUserIcon />
						{/if}

						{name}
					</div>

					{#if user.relationship == 'Friend'}
						<button
							on:click={async () => {
								const { _id } = await client.api.openDM(user._id);
								await goto(`${base}/channels/${_id}`);
							}}
						>
							<EnvelopeIcon />
						</button>
					{/if}
					{#if user.relationship == 'Incoming'}
						<button on:click={() => client.api.acceptFriend(user._id)}>
							<CheckIcon />
						</button>
					{/if}
					{#if user.relationship == 'Outgoing' || user.relationship == 'Friend' || user.relationship == 'Incoming'}
						<button on:click={() => client.api.removeFriend(user._id)}>
							<XMarkIcon />
						</button>
					{/if}
				</div>
			{/each}
		{/if}
	{/each}
</main>
