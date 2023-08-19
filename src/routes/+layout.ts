import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import '$lib/i18n';

export const prerender = true;
export const ssr = false;

export const load = (() => {
	const settings: Settings = JSON.parse(localStorage.getItem('settings') || 'null') || {
		lowDataMode: false
	};

	const session: Session | null = JSON.parse(localStorage.getItem('session') || 'null');

	if (session === null) {
		throw redirect(302, '/login');
	}

	return {
		settings,
		session
	};
}) satisfies LayoutLoad;
