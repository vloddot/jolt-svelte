type ReadyPayload = {
  users: User[];
  servers: Server[];
  channels: Channel[];
  emojis: Emoji[];
};

type BulkMessagePayload = {
  messages?: Message[];
  users?: User[];
  members?: Member[];
};

type LoginPayload =
  | (Session & {
      type: 'Success';
    })
  | {
      type: 'Mfa';
      ticket: string;
      allowed_methods: MFAMethod[];
    };

type ChannelTypingPayload = {
  channel_id: string;
  user_id: string;
};
