import type { LayoutLoad } from './$types';

const sections: SettingsSection[] = [
	{
		type: 'header',
		title: 'User Settings'
	},
	{
		type: 'link',
		title: 'Account',
		id: 'account'
	},
	{
		type: 'link',
		title: 'Sessions',
		id: 'sessions'
	},
	{
		type: 'header',
		title: 'Client Settings'
	},
	{
		type: 'link',
		title: 'Text & Images',
		id: 'text'
	},
	{
		type: 'link',
		title: 'Appearence',
		id: 'appearence'
	}
];

export const load = (() => {
	return { sections };
}) satisfies LayoutLoad;
