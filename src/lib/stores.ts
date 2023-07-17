import { writable } from 'svelte/store';

export const users = writable<User[] | null>(null);
export const servers = writable<Server[] | null>(null);
export const channels = writable<Channel[] | null>(null);
export const emojis = writable<Emoji[] | null>(null);
export const currentServerIndex = writable<number | null>(null);
