import GenericUserIcon from '@components/Icons/GenericUserIcon.svelte';
import type { LayoutLoad } from './$types';
import ShieldCheckIcon from '@components/Icons/ShieldCheckIcon.svelte';
import ChatBubbleBottomCenterTextIcon from '@components/Icons/ChatBubbleBottomCenterTextIcon.svelte';

const sections: SettingsSection[] = [
	{
		type: 'header',
		title: 'User Settings'
	},
	{
		type: 'link',
		title: 'Account',
		id: 'account',
		icon: GenericUserIcon
	},
	{
		type: 'link',
		title: 'Sessions',
		id: 'sessions',
		icon: ShieldCheckIcon
	},
	{
		type: 'header',
		title: 'Client Settings'
	},
	{
		type: 'link',
		title: 'Text & Images',
		id: 'text',
		icon: ChatBubbleBottomCenterTextIcon
	}
];

export const load = (() => {
	return { sections };
}) satisfies LayoutLoad;
