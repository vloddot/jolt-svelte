<script lang="ts">
	import { getContext } from '$lib/context';
	import { getAutumnURL, getDisplayAvatar, getDisplayName } from '$lib/util';
	import UserProfilePicture from '@components/UserProfilePicture.svelte';
	import { clientKey } from '@routes/context';

	export let user: User;
	$: name = getDisplayName(user);

	const client = getContext(clientKey)!;
	let profile: UserProfile | undefined;

	$: {
		client.api.fetchUserProfile(user._id).then((result) => (profile = result));
	}
</script>

<div
	style={(profile?.background != undefined &&
		`background-image: url(${getAutumnURL(profile.background)})`) ||
		undefined}
>
	<UserProfilePicture width={64} height={64} src={getDisplayAvatar(user)} {name} />

	<p>
		{name}
	</p>

	<p class="text-sm text-gray-600">{user.username}#{user.discriminator}</p>

	{#await client.api.fetchUserProfile(user._id) then profile}
		{#if profile?.content != undefined}
			<p>{profile.content}</p>
		{/if}
	{/await}
</div>
