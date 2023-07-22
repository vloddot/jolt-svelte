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
