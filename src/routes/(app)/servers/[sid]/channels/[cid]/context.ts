import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export const serverKey: ContextInjectionKey<Writable<Server | undefined>> = Symbol();
export const channelKey: ContextInjectionKey<
	Writable<Extract<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined>
> = Symbol();
