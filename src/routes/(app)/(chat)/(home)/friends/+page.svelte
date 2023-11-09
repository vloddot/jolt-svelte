<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import CheckIcon from '@components/Icons/CheckIcon.svelte';
	import EnvelopeIcon from '@components/Icons/EnvelopeIcon.svelte';
	import GenericUserCircleIcon from '@components/Icons/GenericUserCircleIcon.svelte';
	import XMarkIcon from '@components/Icons/XMarkIcon.svelte';
	import { clientKey } from '@routes/context';

	const client = getContext(clientKey)!;
	let list = Array.from(client.cache.users.values()).filter(
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
			<details open>
				<summary>{title} -- {list.length}</summary>

				{#each list as user}
					{@const name = getDisplayName(user)}
					{@const avatar = getDisplayAvatar(user)}

					<div class="friend-item">
						{#if avatar != undefined}
							<img class="cover" alt={name} src={avatar} width="32px" height="32px" />
						{:else}
							<GenericUserCircleIcon />
						{/if}

						{name}

						<div class="flex-divider" />

						{#if user.relationship == 'Friend'}
							<button
								on:click={async () => {
									const { _id } = await client.openDM(user._id);
									await goto(`${base}/channels/${_id}`);
								}}
							>
								<EnvelopeIcon />
							</button>
						{/if}
						{#if user.relationship == 'Incoming'}
							<button on:click={() => client.acceptFriend(user._id)}>
								<CheckIcon />
							</button>
						{/if}
						{#if user.relationship == 'Outgoing' || user.relationship == 'Friend' || user.relationship == 'Incoming'}
							<button on:click={() => client.removeFriend(user._id)}>
								<XMarkIcon />
							</button>
						{/if}
					</div>
				{/each}
			</details>
		{/if}
	{/each}
</main>

<style lang="scss">
	.friend-item {
		display: flex;
		gap: 8px;
		align-items: center;
		margin: 0px 8px;
		padding: 4px 8px;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: background-color 100ms;

		&:hover {
			background-color: var(--secondary-background);
		}

		button {
			border-radius: 100%;
			display: flex;
			align-items: center;
		}
	}
</style>
