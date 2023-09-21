import type { Client } from '$lib/client';
import type { ContextInjectionKey } from '$lib/context';
import type VoiceClientBrowser from '@revkit/voice/browser';
import type { Writable } from 'svelte/store';

export const settingsKey: ContextInjectionKey<Writable<Settings>> = Symbol();
export const sessionKey: ContextInjectionKey<Writable<Session | null>> = Symbol();
export const clientKey: ContextInjectionKey<Client> = Symbol();
export const voiceClientKey: ContextInjectionKey<Writable<VoiceClientBrowser>> =
	Symbol();
