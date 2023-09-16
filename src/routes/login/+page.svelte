<script lang="ts">
	import '$lib/index.css';
	import './index.css';
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import detect from 'browser-detect';
	import { appWindow } from '@tauri-apps/api/window';
	import { base } from '$app/paths';

	const session = getContext(sessionKey)!;
	const client = getContext(clientKey)!;

	// current email input
	let email = '';

	// current password input
	let password = '';

	// MFA methods with their input fields' values
	let mfaMethods: [MFAMethod, string][] = [
		['Totp', ''],
		['Recovery', ''],
		['Password', '']
	];

	// whether to remember the session or not
	let rememberMe: boolean = true;

	// error text to display
	let error: string | undefined = undefined;

	function getFriendlyName(): string {
		const { mobile, os, name } = detect();

		return `Jolt ${mobile ? 'mobile' : 'desktop'} on ${
			('__TAURI__' in window ? os ?? name : name ?? os) ?? 'Unknown Platform'
		}`;
	}

	async function handleLoginResponse(response: Exclude<ResponseLogin, { result: 'MFA' }>) {
		if (response.result == 'Disabled') {
			error = `Account ${response.user_id} is disabled.`;
			return;
		}

		if (response.result == 'Success') {
			session.set(response);

			if (rememberMe) {
				localStorage.setItem('session', JSON.stringify(response));
			}

			await goto(base);
			return;
		}
	}

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

		const friendly_name = getFriendlyName();
		const credentialLoginResponse = await client.api
			.login({
				email,
				password,
				friendly_name
			})
			.catch((err: string) => {
				error = err;
			});

		if (credentialLoginResponse == undefined) {
			return;
		}

		if (credentialLoginResponse.result == 'MFA') {
			const mfaLoginResponse = await client.api
				.login({
					mfa_ticket: credentialLoginResponse.ticket,
					mfa_response,
					friendly_name
				})
				.catch((err: string) => {
					error = err;
				});

			if (mfaLoginResponse == undefined) {
				return;
			}

			if (mfaLoginResponse.result == 'MFA') {
				error = `Invalid MFA method or code.`;
				mfaMethods = mfaLoginResponse.allowed_methods.map((method) => [method, '']);
				return;
			}

			await handleLoginResponse(mfaLoginResponse);
			return;
		}

		await handleLoginResponse(credentialLoginResponse);
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

	const TITLE = 'Jolt - Login';
	$: if ('__TAURI__' in window) {
		appWindow.setTitle(TITLE);
	}
</script>

<div class="w-full h-full flex items-center flex-col justify-center relative">
	<div
		class="rounded-xl relative items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-6 py-12 max-w-[90%] mb-auto"
	>
		<form class="flex flex-col" on:submit|preventDefault={login}>
			<h1 class="text-3xl">Jolt</h1>

			<input type="email" placeholder="Email" bind:value={email} />
			<input type="password" placeholder="Password" bind:value={password} />

			<p class="text-xs text-gray-500">
				{$_('mfa.notice')}:
			</p>

			{#each mfaMethods as [method, value]}
				<input type="text" placeholder={displayMfaMethod(method)} bind:value />
			{/each}

			<span class="flex justify-center">
				<label>
					Remember me <input type="checkbox" name="remember-me" bind:checked={rememberMe} />
				</label>
			</span>

			<button type="submit">{$_('login')}</button>
		</form>

		{#if error}
			<p>{error}</p>
		{/if}
	</div>
</div>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content="Jolt - Login" />
</svelte:head>
