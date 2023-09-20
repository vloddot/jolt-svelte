import type { APIClient } from '$lib/client';
import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export interface Reply {
	message: Message;
	mention: boolean;
}

export async function getUser(
	api: APIClient,
	users: User[],
	id: string
): Promise<User | undefined> {
	if (id == '0'.repeat(26)) {
		return;
	}

	const user = users.find((user) => user._id == id);

	if (user == undefined) {
		return await api.fetchUser(id);
	}

	return user;
}
export const messagesKey: ContextInjectionKey<Writable<Message[]>> = Symbol();
export const membersKey: ContextInjectionKey<Writable<Member[]>> = Symbol();
export const usersKey: ContextInjectionKey<Writable<User[]>> = Symbol();
export const repliesKey: ContextInjectionKey<Writable<Reply[]>> = Symbol();
