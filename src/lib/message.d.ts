type SystemMessage = unknown;

type MessageInteractions = unknown;

type Masquerade = unknown;

type Message = {
  _id: string;
  nonce?: string;
  channel: string;
  author: string;
  content: string;
  system?: SystemMessage;
  attachments?: AutumnFile[];
  edited?: string;
  embeds: Embed[];
  mentions?: string[];
  replies?: string[];
  reactions: unknown;
  interactions: MessageInteractions;
  masquerade?: Masquerade;
};
