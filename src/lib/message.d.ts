type SystemMessage = unknown;

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

type SpecialEmbed = unknown;

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
