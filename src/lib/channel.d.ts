type Channel =
  | {
      channel_type: 'SavedMessages';
      _id: string;
      user: string;
    }
  | {
      channel_type: 'DirectMessage';
      _id: string;
      active: boolean;
      recipients: [string, string];
      last_message_id?: string;
    }
  | {
    channel_type: 'Group';
    _id: string;
    name: string;
    owner: string;
    description?: string;
    recipients: string[];
    icon?: AutumnFile;
    permissions?: number;
    nsfw: boolean;
  } | {
    channel_type: 'TextChannel';
    _id: string;
    server: string;
    name: string;
    description?: string;
    icon?: AutumnFile;
    last_message_id?: string;
    nsfw: boolean;
  } | {
    channel_type: 'VoiceChannel';
    _id: string;
    server: string;
    name: string;
    description?: string;
    icon?: AutumnFile;
    nsfw: boolean;
  };

type SystemMessageChannels = {
  user_joined?: string;
  user_left?: string;
  user_kicked?: string;
  user_banned?: string;
};

type Category = {
  id: string;
  title: string;
  channels: string[];
};

type MemberCompositeKey = {
  server: string;
  user: string;
};
