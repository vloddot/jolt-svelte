type AutumnFileMetadata =
	| {
			type: 'File';
	  }
	| {
			type: 'Text';
	  }
	| {
			type: 'Image' | 'Video';
			width: number;
			height: number;
	  }
	| {
			type: 'Audio';
	  };

type AutumnFile = {
	_id: string;
	tag: string;
	filename: string;
	metadata: AutumnFileMetadata;
	content_type: string;
	size: number;
	deleted?: boolean;
	reported?: boolean;
};

type Session = {
	_id: string;
	user_id: string;
	token: string;
	name: string;
	subscription?: WebPushSubscription;
};

type WebPushSubscription = {
	endpoint: string;
	p256dh: string;
	auth: string;
};

type MFAMethod = 'Totp' | 'Recovery' | 'Password';
