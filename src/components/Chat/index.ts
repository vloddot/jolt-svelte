import type { APIClient } from '$lib/client';
import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export interface Reply {
	message: Message;
	mention: boolean;
}

export function getUser(api: APIClient, users: User[], id: string): Promise<User | undefined> {
	return new Promise((resolve, reject) => {
		if (id == '0'.repeat(26)) {
			resolve(undefined);
		}

		const user = users.find((user) => user._id == id);

		if (user == undefined) {
			api.fetchUser(id).then(resolve).catch(reject);
		}

		resolve(user);
	});
}
export const messagesKey: ContextInjectionKey<Writable<Message[]>> = Symbol();
export const membersKey: ContextInjectionKey<Writable<Member[]>> = Symbol();
export const usersKey: ContextInjectionKey<Writable<User[]>> = Symbol();
export const repliesKey: ContextInjectionKey<Writable<Reply[]>> = Symbol();
