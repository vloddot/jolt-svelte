import type { LayoutLoad } from './$types';

const sections: SettingsSection[] = [
	{
		type: 'link',
		title: 'Overview',
		id: 'overview'
	},
	{
		type: 'link',
		title: 'Categories',
		id: 'categories'
	},
	{
		type: 'link',
		title: 'Roles',
		id: 'roles'
	},
	{
		type: 'link',
		title: 'Emojis',
		id: 'emojis'
	},
	{
		type: 'link',
		title: 'Members',
		id: 'members'
	},
	{
		type: 'link',
		title: 'Invitations',
		id: 'invitations'
	},
	{
		type: 'link',
		title: 'Bans',
		id: 'bans'
	}
];

export const load = (() => {
	return { sections };
}) satisfies LayoutLoad;
