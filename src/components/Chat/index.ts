import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export interface Reply {
	message: Message;
	mention: boolean;
}

export const messagesKey: ContextInjectionKey<Writable<Message[]>> = Symbol();
export const membersKey: ContextInjectionKey<Writable<Member[]>> = Symbol();
export const usersKey: ContextInjectionKey<Writable<User[]>> = Symbol();
export const repliesKey: ContextInjectionKey<Writable<Reply[]>> = Symbol();
