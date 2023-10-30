<script lang="ts">
	import { getContext } from '$lib/context';
	import { getAutumnURL, getDisplayAvatar, getDisplayName } from '$lib/util';
	import { clientKey } from '@routes/context';

	export let user: User;

	const client = getContext(clientKey)!;
	let profile: UserProfile | undefined;

	$: name = getDisplayName(user);
	$: client.api.fetchUserProfile(user._id).then((result) => (profile = result));
</script>

<div
	class="user-detail"
	style={profile?.background != undefined
		? `background-image: url(${getAutumnURL(profile.background)})`
		: undefined}
>
	<img class="cover" width="64px" height="64px" src={getDisplayAvatar(user)} alt={name} />

	<h1 class="secondary-fg">{name}</h1>

	<h2 class="secondary-fg">{user.username}#{user.discriminator}</h2>
</div>

<div class="profile">
	{#await client.api.fetchUserProfile(user._id) then profile}
		{#if profile?.content != undefined}
			<p class="profile-content">{profile.content}</p>
		{/if}
	{/await}
</div>

<style lang="scss">
	.user-detail {
		max-height: 240px;
	}

	.secondary-fg {
		color: var(--secondary-foreground);
	}

	h1 {
		font-size: 1.2rem;
	}

	h2 {
		font-size: 1.1rem;
	}

	.profile-content {
		overflow-wrap: break-word;
		white-space: pre-wrap;
	}

	.profile {
		background-color: var(--primary-background);
	}
</style>
