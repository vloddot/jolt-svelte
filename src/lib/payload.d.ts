type ReadyPayload = {
  users: User[];
  servers: Server[];
  channels: Channel[];
  emojis: Emoji[];
};

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
