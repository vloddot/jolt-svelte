import type { ContextInjectionKey } from "$lib/context";
import type { Writable } from "svelte/store";

export const selectedChannelIDKey: ContextInjectionKey<Writable<string | undefined>> = Symbol();
