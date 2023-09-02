type SystemMessage =
	| {
			type: 'text';
			content: string;
	  }
	| {
			type: 'user_added';
			id: string;
			by: string;
	  }
	| {
			type: 'user_remove';
			id: string;
			by: string;
	  }
	| {
			type: 'user_joined';
			id: string;
	  }
	| {
			type: 'user_left';
			id: string;
	  }
	| {
			type: 'user_kicked';
			id: string;
	  }
	| {
			type: 'user_banned';
			id: string;
	  }
	| {
			type: 'channel_renamed';
			name: string;
			by: string;
	  }
	| {
			type: 'channel_description_changed';
			by: string;
	  }
	| {
			type: 'channel_icon_changed';
			by: string;
	  }
	| {
			type: 'channel_ownership_changed';
			from: string;
			to: string;
	  };

type MessageInteractions = {
	/**
	 * Reactions which should always appear and be distinct.
	 */
	reactions?: unknown;
	/**
	 * Whether reactions should be restricted to the given list.
	 *
	 * Can only be set to true if reactions list is of at least length 1.
	 */
	restrict_reactions: boolean;
};

type Masquerade = {
	/**
	 * Replace the display name shown on this message.
	 */
	name?: string;
	/**
	 * Replace the avatar shown on this message (URL to image file).
	 */
	avatar?: string;
	/**
	 * Replace the display role shown on this message.
	 *
	 * Must have `ManageRole` permission to use.
	 */
	colour?: string;
};

type Message = {
	_id: string;
	nonce?: string;
	channel: string;
	author: string;
	content?: string;
	system?: SystemMessage;
	attachments?: AutumnFile[];
	edited?: string;
	embeds?: Embed[];
	mentions?: string[];
	replies?: string[];
	reactions: unknown;
	interactions: MessageInteractions;
	masquerade?: Masquerade;
};

type ImageEmbed = {
	url: string;
	width: number;
	height: number;
	size: 'Large' | 'Preview';
};

type VideoEmbed = {
	url: string;
	width: number;
	height: number;
};

type LightspeedType = 'Channel';
type TwitchType = 'Channel' | 'Video' | 'Clip';
type BandcampType = 'Album' | 'Track';

type SpecialEmbed =
	| {
			type: 'None';
	  }
	| {
			type: 'GIF';
	  }
	| {
			type: 'YouTube';
			id: string;
			timestamp?: string;
	  }
	| {
			type: 'Lightspeed';
			content_type: LightspeedType;
			id: string;
	  }
	| {
			type: 'Twitch';
			content_type: TwitchType;
			id: string;
	  }
	| {
			type: 'Spotify';
			content_type: string;
			id: string;
	  }
	| {
			type: 'SoundCloud';
	  }
	| {
		type: 'Bandcamp';
		content_type: BandcampType;
		id: string;
	} | {
		type: 'Streamable';
		id: string;
	};

type Embed =
	| {
			type: 'Website';
			url?: string;
			original_url?: string;
			special?: SpecialEmbed;
			title?: string;
			description?: string;
			image?: ImageEmbed;
			video?: VideoEmbed;
			site_name?: string;
			icon_url?: string;
			colour?: string;
	  }
	| ({
			type: 'Image';
	  } & ImageEmbed)
	| ({
			type: 'Video';
	  } & VideoEmbed)
	| {
			type: 'Text';
			icon_url?: string;
			url?: string;
			title?: string;
			description?: string;
			media?: AutumnFile;
			colour?: string;
	  }
	| {
			type: 'None';
	  };

type SendableEmbed = {
	icon_url?: string;
	url?: string;
	title?: string;
	description?: string;
	media?: string;
	colour?: string;
};

type Reply = {
	id: string;
	mention: boolean;
};
