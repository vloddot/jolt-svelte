import type { APIClient } from '$lib/client';
import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export interface SendableReply {
	message: Message;
	mention: boolean;
}

export async function getUser(
	api: APIClient,
	users: User[] | Map<string, User>,
	id: string
): Promise<User | undefined> {
	if (id == '0'.repeat(26)) {
		return;
	}

	let user: User | undefined;
	if (Array.isArray(users)) {
		user = users.find((user) => user._id == id);
	} else {
		user = users.get(id);
	}

	if (user == undefined) {
		return await api.fetchUser(id);
	}

	return user;
}
export const channelKey: ContextInjectionKey<Exclude<Channel, { channel_type: 'VoiceChannel' }>> =
	Symbol();
export const messagesKey: ContextInjectionKey<Writable<Message[]>> = Symbol();
export const membersKey: ContextInjectionKey<Writable<Member[]>> = Symbol();
export const usersKey: ContextInjectionKey<Writable<User[]>> = Symbol();
export const repliesKey: ContextInjectionKey<Writable<SendableReply[]>> = Symbol();
export const nearbyMessageKey: ContextInjectionKey<string> = Symbol();
