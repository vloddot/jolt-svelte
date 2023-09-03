import {
	getContext as svelteGetContext,
	setContext as svelteSetContext,
	hasContext as svelteHasContext
} from 'svelte';

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
