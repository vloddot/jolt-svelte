import type { ContextInjectionKey } from '$lib/context';
import type { Writable } from 'svelte/store';

export const channelKey: ContextInjectionKey<
	Writable<Extract<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }> | undefined>
> = Symbol();
