import { writable } from 'svelte/store';

export const servers = writable<Server[] | null>(null);
export const currentServerID = writable<string | null>(null);
export const currentChannelID = writable<string | null>(null);
export const session = writable<Session | null>(null);
