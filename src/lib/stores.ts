import { writable } from 'svelte/store';

export const servers = writable<Server[] | null>(null);
export const selectedServerID = writable<string | null>(null);
export const selectedChannelID = writable<string | null>(null);
export const session = writable<Session | null>(null);
export const pageToShow = writable<'main' | 'login' | 'settings' | null>(null);
export const settings = writable<Settings>({ lowDataMode: false });
