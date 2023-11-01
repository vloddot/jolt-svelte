<script lang="ts">
	import { getDisplayName } from '$lib/util';
	import UserIcon from './UserIcon.svelte';

	export let user: User;
	export let member: Member;

	$: name = getDisplayName(user, member);
</script>

<div role="button" class="user-button">
	<UserIcon {user} {member} size={28} />

	<div class="user-detail">
		<div>{name}</div>

		<div class="user-presence">
			{#if !user.online || user.status?.presence == 'Invisible'}
				Offline
			{:else if user.status?.text != undefined}
				{user.status.text}
			{:else if user.status?.presence == 'Busy'}
				Do Not Disturb
			{:else if user.status?.presence != undefined}
				{user.status.presence}
			{:else}
				Online
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.user-button {
		display: flex;
		margin-left: 12px;
		margin-right: 12px;
		border-radius: var(--border-radius);
		padding-top: 4px;
		padding-left: 4px;
		padding-right: 4px;
		gap: 8px;
		cursor: pointer;

		&:hover {
			background-color: var(--hover);
		}

		.user-detail {
			display: flex;
			flex-direction: column;
			white-space: nowrap;
			overflow: hidden;
			
			.user-presence {
				color: var(--tertiary-foreground);
				font-size: 0.6875rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
