<script lang="ts">
	import { invoke } from '@tauri-apps/api';
	import '$lib/index.css';
	import './index.css';
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { getContext, sessionKey } from '$lib/context';

	const session = getContext(sessionKey);

	// current email input
	let email = '';

	// current password input
	let password = '';

	// error text to display
	let error: string | undefined = undefined;

	// MFA Methods with their input fields' values
	let mfaMethods: [MFAMethod, string][] = [
		['Totp', ''],
		['Recovery', '']
	];

	async function login() {
		let mfa_response:
			| { totp_code: string }
			| { recovery_code: string }
			| { password: string }
			| undefined = undefined;

		const totp_code = mfaMethods.find(([method]) => method == 'Totp')?.[1].trim();
		const recovery_code = mfaMethods.find(([method]) => method == 'Recovery')?.[1].trim();
		const mfaPassword = mfaMethods.find(([method]) => method == 'Password')?.[1].trim();

		if (totp_code != undefined && totp_code != '') {
			mfa_response = { totp_code };
		} else if (recovery_code != undefined && recovery_code != '') {
			mfa_response = { recovery_code };
		} else if (mfaPassword != undefined && mfaPassword != '') {
			mfa_response = { password: mfaPassword };
		}

		const payload = await invoke<LoginPayload>('login', {
			email,
			password,
			mfa_response
		}).catch((err) => {
			error = err;
		});

		if (payload == undefined) {
			return;
		}

		if (payload.result == 'Success') {
			session?.set(payload);
			localStorage.setItem('session', JSON.stringify(payload));

			await goto('/');
		} else if (payload.result == 'Mfa') {
			mfaMethods = payload.allowed_methods.map((method) => [method, '']);
			error = 'Invalid MFA method';
		} else if (payload.result == 'Disabled') {
			error = `Account ${payload.user_id} is disabled.`;
		}
	}

	function displayMfaMethod(method: string): string {
		return (
			{
				Totp: 'MFA TOTP',
				Recovery: 'MFA Recovery Code',
				Password: 'Password'
			}[method] ?? 'Unknown MFA Method'
		);
	}
</script>

<div class="w-full h-full flex items-center flex-col justify-center relative">
	<div
		class="rounded-xl relative items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-6 py-12 max-w-[90%] mb-auto"
	>
		<form class="flex flex-col" on:submit|preventDefault={login}>
			<input type="email" placeholder="Email" bind:value={email} />
			<input type="password" placeholder="Password" bind:value={password} />

			<p class="text-xs text-gray-500">
				{$_('mfa.notice')}:
			</p>
			{#each mfaMethods as [method, value]}
				<input type="text" placeholder={displayMfaMethod(method)} bind:value />
			{/each}

			<button type="submit">{$_('login')}</button>
		</form>

		{#if error}
			{error}
		{/if}
	</div>
</div>
