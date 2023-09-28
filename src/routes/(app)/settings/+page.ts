import { base } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent, url }) => {
	const { sections } = await parent();

	const section = sections.find((section) => section.type == 'link') as Extract<
		SettingsSection,
		{ type: 'link' }
	>;

	if (section == undefined) {
		throw error(404, 'Not Found');
	}

	throw redirect(302, `${url.pathname}/${section.id}`);
}) satisfies PageLoad;
