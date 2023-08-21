import {
	getContext as svelteGetContext,
	setContext as svelteSetContext,
	hasContext as svelteHasContext
} from 'svelte';
import type { Writable } from 'svelte/store';

declare const isChecked: unique symbol;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
export interface ContextInjectionKey<_> {}

interface CheckedContextInjectionKey<T> extends ContextInjectionKey<T> {
	[isChecked]?: never;
}

type GetContext = {
	<T>(key: CheckedContextInjectionKey<T>): T;
	<T>(key: ContextInjectionKey<T>): undefined | T;
};

type SetContext = <T>(key: ContextInjectionKey<T>, context: T) => void;
type HasContext = <T>(key: ContextInjectionKey<T>) => key is CheckedContextInjectionKey<T>;

export const getContext = svelteGetContext as GetContext;
export const setContext = svelteSetContext as SetContext;
export const hasContext = svelteHasContext as HasContext;

export const serversKey: ContextInjectionKey<Writable<Server[] | undefined>> = Symbol();
export const clientReadyKey: ContextInjectionKey<Writable<boolean>> = Symbol();
export const runningClientKey: ContextInjectionKey<Writable<boolean>> = Symbol();
export const settingsKey: ContextInjectionKey<Writable<Settings>> = Symbol();
export const sessionKey: ContextInjectionKey<Writable<Session>> = Symbol();
export const selectedServerIDKey: ContextInjectionKey<Writable<string | undefined>> = Symbol();
export const selectedChannelIDKey: ContextInjectionKey<Writable<string | undefined>> = Symbol();
