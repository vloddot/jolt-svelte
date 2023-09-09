import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { sections } = await parent();

	throw redirect(302, `/settings/${sections[0].id}`);
}) satisfies PageLoad;
