export interface DisplayedSetting {
	title: string;
	description?: string;
	key: keyof Settings;
}

export interface SettingsSection {
	title: string;
	href: string;
	settings: DisplayedSetting[];
}

export const load = () => {
	const sections: SettingsSection[] = [
		{
			title: 'Text & Images',
			href: 'text',
			settings: [
				{
					title: 'Low Data Mode',
					description: `Blocks media from sources other than the installed app on your system.
So media installed with the app are shown but not media from the internet.`,
					key: 'lowDataMode'
				}
			]
		},
		{
			title: 'Appearence',
			href: 'appearence',
			settings: [
				{
					title: 'Compact Mode',
					description: 'Hides user icons. Light on the eyes.',
					key: 'compactMode'
				}
			]
		}
	];

	return { sections };
};
