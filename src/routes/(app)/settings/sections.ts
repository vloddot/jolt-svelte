export type SettingsSection =
	| {
			readonly type: 'link';
			readonly title: string;
			readonly id: string;
	  }
	| {
			readonly type: 'header';
			title: string;
	  };

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

export default sections;
