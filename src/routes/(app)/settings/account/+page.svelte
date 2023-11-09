<script lang="ts">
	import { getContext } from '$lib/context';
	import DropdownSetting from '@components/Settings/DropdownSetting.svelte';
	import InputSetting from '@components/Settings/InputSetting.svelte';
	import { clientKey } from '@routes/context';

	const client = getContext(clientKey)!;
	let username = '';
	let password = '';
	let changeUsernamePromise: Promise<User> | undefined = undefined;
</script>

<DropdownSetting title="Change username" id="change-username">
	<form
		id="change-username-form"
		on:submit|preventDefault={() =>
			(changeUsernamePromise = client.changeUsername(username, password))}
	>
		<InputSetting
			type="text"
			placeholder="Username"
			description="Your shiny new username!"
			bind:value={username}
		/>
		<InputSetting
			type="password"
			placeholder="Password"
			description="Your current password to verify the changes made to your account."
			bind:value={password}
		/>
		<button type="submit">Change your username.</button>
		{#if changeUsernamePromise != undefined}
			<p>
				{#await changeUsernamePromise}
					Changing username...
				{:then user}
					Successfully changed username to {user.username}#{user.discriminator}!
				{:catch error}
					Failed to change username: {error}
				{/await}
			</p>
		{/if}
	</form>
</DropdownSetting>
