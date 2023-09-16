import { base } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const {
		sections: [section]
	} = await parent();

	if (section.type != 'normal') {
		throw error(404, 'Not Found');
	}

	throw redirect(302, `${base}/settings/${section.id}`);
}) satisfies PageLoad;
