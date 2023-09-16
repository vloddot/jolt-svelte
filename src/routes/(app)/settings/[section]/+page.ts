import sections from '@routes/(app)/settings/sections';
import { fail } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { sections } = await parent();

	const section = sections.find(
		(section) => section.type == 'normal' && params.section == section.id
	);

	if (section == undefined) {
		throw fail(404);
	}

	return { section };
}) satisfies PageLoad;

export const entries = (() => {
	return sections
		.filter((section) => section.type == 'normal')
		.map((section) => {
			if (section.type != 'normal') {
				throw new Error(`unreachable, section ${section} is not of type "normal"`);
			}

			return { section: section.id };
		});
}) satisfies EntryGenerator;
