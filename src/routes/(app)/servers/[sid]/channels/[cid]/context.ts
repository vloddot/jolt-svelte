import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export const serverKey: ContextInjectionKey<Writable<Server | undefined>> = Symbol();
export const channelKey: ContextInjectionKey<Writable<Channel | undefined>> = Symbol();
