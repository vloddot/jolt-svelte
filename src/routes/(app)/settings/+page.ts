import { base } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { SettingsSection } from './sections';

export const load = (async ({ parent }) => {
	const { sections } = await parent();

	const section = sections.find((section) => section.type == 'link') as Extract<
		SettingsSection,
		{ type: 'link' }
	>;

	if (section == undefined) {
		throw error(404, 'Not Found');
	}

	throw redirect(302, `${base}/settings/${section.id}`);
}) satisfies PageLoad;
