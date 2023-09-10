import sections from '@routes/(app)/settings/sections';
import { fail } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { sections } = await parent();

	const section = sections.find(({ id }) => params.section == id);

	if (section == undefined) {
		throw fail(404);
	}

	return { section };
}) satisfies PageLoad;

export const entries = (() => {
	return sections.map((section) => ({ section: section.id }));
}) satisfies EntryGenerator;
