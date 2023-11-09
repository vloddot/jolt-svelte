import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export const selectedChannelKey: ContextInjectionKey<Writable<Channel | undefined>> = Symbol();
export const selectedServerKey: ContextInjectionKey<Writable<Server | undefined>> = Symbol();
