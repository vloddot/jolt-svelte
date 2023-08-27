type ReadyPayload = Server[];

type BulkMessagePayload =
	| {
		messages?: Message[];
		users?: User[];
		members?: Member[];
	}
	| Message[];

type LoginPayload =
	| (Session & {
		result: 'Success';
	})
	| {
		result: 'Mfa';
		ticket: string;
		allowed_methods: MFAMethod[];
	}
	| {
		result: 'Disabled';
		user_id: string;
	};

type ChannelTypingPayload = {
	channel_id: string;
	user_id: string;
};

type DataMessageSend = {
	/**
	 * Message content to send.
	 * length min: 0, max: 2000
	 */
	content?: string;
	/**
	 * Attachments to include in the message.
	 * length min: 1, max: 128
	 */
	attachments?: string[];
	/**
	 * Messages to reply to
	 */
	replies?: Reply[];
	/**
	 * Embeds to include in message.
	 *
	 * Text embed content contributes to the content length cap
	 * length min: 0, max: 10
	 */
	embeds?: SendableEmbed[];
	/**
	 * Masquerade to apply to this message.
	 */
	masquerade?: Masquerade;
	/**
	 * Information about how this message should be interacted with.
	 */
	interactions?: MessageInteractions;
};

type DataEditMessage = Partial<{
	content: string;
	embeds: SendableEmbed[];
}>;
