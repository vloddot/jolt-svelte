import type { LayoutLoad } from './$types';
import sections from '@routes/(app)/settings/sections';

export const load = (() => {
	return { sections };
}) satisfies LayoutLoad;
