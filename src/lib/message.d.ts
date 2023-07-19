type BulkMessageResponse = {
  messages?: Message[];
  users?: User[];
  members?: Member[];
};

type SystemMessage = {

};

type MessageInteractions = {

};

type Masquerade = {

};

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
