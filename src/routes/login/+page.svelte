<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import { appWindow } from '@tauri-apps/api/window';
	import detect from 'browser-detect';

	const session = getContext(sessionKey)!;
	const client = getContext(clientKey)!;

	// current email input
	let email = '';

	// current password input
	let password = '';

	// MFA methods with their input fields' values
	let mfaMethods: [MFAMethod, string][] = [
		['Totp', ''],
		['Recovery', '']
	];

	// whether to remember the session or not
	let rememberMe = true;

	// error text to display
	let error: string | undefined = undefined;

	function getFriendlyName(): string {
		const { mobile, os, name } = detect();

		let platform: string;
		if ('__TAURI__' in window && os != undefined) {
			platform = os.charAt(0).toUpperCase() + os.slice(1);
		} else if (name != undefined) {
			platform = name.charAt(0).toUpperCase() + name.slice(1);
		} else {
			platform = 'Unknown Platform';
		}

		return `Jolt ${mobile ? 'Mobile' : 'Desktop'} on ${platform}`;
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

			await goto(`${base}/`);
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
		const credentialLoginResponse = await client
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
			const mfaLoginResponse = await client
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
				Password: 'MFA Password'
			}[method] ?? 'Unknown MFA Method'
		);
	}

	const TITLE = 'Jolt - Login';
	$: if ('__TAURI__' in window) {
		appWindow.setTitle(TITLE);
	}
</script>

<div class="modal">
	<form id="login-form" class="modal-base" on:submit|preventDefault={login}>
		<h1>Jolt &#x26A1;</h1>

		<p>
			The Revolt client inspired by the revolt.chat client re-taped from the one that's held
			together by duct tape and bad code
		</p>

		<input type="email" placeholder="Email" bind:value={email} />
		<input type="password" placeholder="Password" bind:value={password} />

		<p>
			Optionally, if your account uses MFA, use one of these methods, including the previous email
			and password as well
		</p>

		{#each mfaMethods as [method, value]}
			<input type="text" placeholder={displayMfaMethod(method)} bind:value />
		{/each}

		<label>
			Remember me <input type="checkbox" bind:checked={rememberMe} />
		</label>

		<button type="submit">Login</button>
		{#if error}
			<p>{error}</p>
		{/if}
	</form>
</div>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content="Jolt - Login" />
</svelte:head>

<style lang="scss">
	input {
		margin-bottom: 8px;
	}

	p {
		margin-top: 0;
		max-width: 80%;
	}
</style>
