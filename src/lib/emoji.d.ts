type EmojiParent =
	| {
			type: 'Server';
			id: string;
	  }
	| {
			type: 'Detached';
	  };

type Emoji = {
	_id: string;
	parent: EmojiParent;
	creator_id: string;
	name: string;
	animated: boolean;
	nsfw: boolean;
};
