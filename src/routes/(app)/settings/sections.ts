import { goto } from '$app/navigation';
import type { Client } from '$lib/client';
import { getDisplayName } from '$lib/util';
import type { Writable } from 'svelte/store';

type FilterMapType<T, F> = {
	[K in keyof T]: T[K] extends F ? T[K] : never;
};

type CheckValidKey<T, K extends keyof T> = T[K] extends never ? never : K;

type SettingsWithType<T> = {
	[K in keyof Settings as CheckValidKey<FilterMapType<Settings, T>, K>]: Settings[K];
};

export type Action<T> =
	| {
			readonly type: 'none';
	  }
	| {
			readonly type: 'update-custom-setting';
			readonly key: keyof SettingsWithType<T>;
	  }
	| {
			readonly type: 'change-username';
			readonly usernameId: string;
			readonly passwordId: string;
	  }
	| {
			readonly type: 'logout';
	  };

export type DisplayedSetting = (
	| {
			readonly type: 'checkbox';
			readonly action: Action<boolean>;
	  }
	| {
			readonly type: 'dropdown';
			readonly form: DisplayedSetting[];
	  }
	| ((
			| {
					readonly type: 'text';
			  }
			| {
					readonly type: 'password';
			  }
	  ) & {
			readonly getDefaultValue?: (client: Client) => Promise<string>;
	  })
) & {
	readonly action: Action<unknown>;
	readonly title: string;
	readonly id: string;
	readonly description?: string;
};

export type SettingsSection =
	| {
			readonly type: 'normal';
			readonly title: string;
			readonly id: string;
			readonly settings: DisplayedSetting[];
	  }
	| {
			readonly type: 'button';
			readonly title: string;
			readonly onClick: (client: Client, session: Writable<Session | null>) => void;
	  }
	| {
			readonly type: 'hr';
	  };

const sections: SettingsSection[] = [
	{
		type: 'normal',
		title: 'Account',
		id: 'account',
		settings: [
			{
				type: 'dropdown',
				title: 'Change username',
				description: 'Change your account username.',
				id: 'change-username',
				action: {
					type: 'change-username',
					usernameId: 'username',
					passwordId: 'password'
				},
				form: [
					{
						type: 'text',
						title: 'Username',
						action: { type: 'none' },
						async getDefaultValue(client: Client) {
							return getDisplayName(client.user);
						},
						id: 'username'
					},
					{ type: 'password', title: 'Password', action: { type: 'none' }, id: 'password' }
				]
			}
		]
	},
	{ type: 'hr' },
	{
		type: 'normal',
		title: 'Text & Images',
		id: 'text',
		settings: [
			{
				type: 'checkbox',
				title: 'Low Data Mode',
				description: `Blocks media from sources other than the installed app on your system.
				So media installed with the app are shown but not media from the internet.`,
				id: 'jolt:low-data-mode',
				action: {
					type: 'update-custom-setting',
					key: 'jolt:low-data-mode'
				}
			},
			{
				type: 'checkbox',
				title: 'Send Typing Indicators',
				description: 'Enables sending typing indicators to other members. (<user> is typing...)',
				id: 'jolt:send-typing-indicators',
				action: {
					type: 'update-custom-setting',
					key: 'jolt:send-typing-indicators'
				}
			},
			{
				type: 'checkbox',
				title: 'Receive Typing Indicators',
				description: 'Enables receiving typing indicators from other members.',
				id: 'jolt:receive-typing-indicators',
				action: {
					type: 'update-custom-setting',
					key: 'jolt:receive-typing-indicators'
				}
			}
		]
	},
	{
		type: 'normal',
		title: 'Appearence',
		id: 'appearence',
		settings: [
			{
				type: 'checkbox',
				title: 'Compact Mode',
				description: 'Hides user icons. Light on the eyes.',
				id: 'jolt:compact-mode',
				action: {
					type: 'update-custom-setting',
					key: 'jolt:compact-mode'
				}
			}
		]
	},
	{ type: 'hr' },
	{
		type: 'button',
		title: 'Logout',
		async onClick(client, session) {
			await client.api.logout();
			session.set(null);
			await goto('/login');
		}
	}
];

export default sections;
