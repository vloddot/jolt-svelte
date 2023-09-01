import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export const dmsKey: ContextInjectionKey<Writable<Channel[]>> = Symbol();
export const serversKey: ContextInjectionKey<Writable<Server[] | undefined>> = Symbol();
export const clientReadyKey: ContextInjectionKey<Writable<boolean>> = Symbol();
export const selectedServerIDKey: ContextInjectionKey<Writable<string | undefined>> = Symbol();
export const selectedChannelIDKey: ContextInjectionKey<Writable<string | undefined>> = Symbol();
