import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export interface SendableReply {
	message: Message;
	mention: boolean;
}

export type UserSentMessage = {
	_id: Message['_id'];
	content: Message['content'];
	channel: string;
	author: string;
	replies: string[];
	promise: Promise<Message>;
};

export async function getUser(
	users: User[] | Map<string, User>,
	id: string,
	fallback: (id: string) => User | Promise<User>,
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
		return await fallback(id);
	}

	return user;
}

export const messagesKey: ContextInjectionKey<Writable<Message[]>> = Symbol();
export const membersKey: ContextInjectionKey<Writable<Member[]>> = Symbol();
export const usersKey: ContextInjectionKey<Writable<User[]>> = Symbol();
export const repliesKey: ContextInjectionKey<Writable<SendableReply[]>> = Symbol();
export const nearbyMessageKey: ContextInjectionKey<string> = Symbol();
export const showEmojiMenuKey: ContextInjectionKey<Writable<boolean>> = Symbol();
export const messageInputKey: ContextInjectionKey<Writable<string>> = Symbol();
export const userSentMessagesKey: ContextInjectionKey<Writable<UserSentMessage[]>> = Symbol();
