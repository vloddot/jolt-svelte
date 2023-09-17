import { goto } from '$app/navigation';
import { base } from '$app/paths';
import type { Client } from '$lib/client';
import type { Action } from '@routes/(app)/settings/sections';
import type { Writable } from 'svelte/store';

export type ActionArgs<T extends Settings[K], K extends keyof Settings> =
	| {
			type: 'change-username';
			client: Client;
			node: ParentNode;
	  }
	| {
			type: 'logout';
			client: Client;
			session: Writable<Session | null>;
	  }
	| {
			type: 'update-custom-setting';
			settings: Writable<Settings>;
			key: K;
			value: T;
	  };

export async function dispatchAction<K extends keyof Settings, T extends Settings[K]>(
	action: Action<T> & ActionArgs<T, K>
) {
	switch (action.type) {
		case 'change-username': {
			const username = action.node.querySelector<HTMLInputElement>(`#${action.usernameId}`)!.value;
			const password = action.node.querySelector<HTMLInputElement>(`#${action.passwordId}`)!.value;

			action.client.user = await action.client.api.changeUsername(username, password);
			break;
		}
		case 'logout': {
			await action.client.api.logout();
			action.session.set(null);
			await goto(`${base}/login`);
			break;
		}
		case 'update-custom-setting': {
			action.settings.update((settings) => {
				settings[action.key as K] = action.value;
				return settings;
			});
			break;
		}
	}
}
