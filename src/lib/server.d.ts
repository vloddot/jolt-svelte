type Server = {
  _id: string;
  owner: string;
  name: string;
  description?: string;
  channels: string[];
  categories?: Category[];
  system_messages?: SystemMessageChannels;
  roles: Record<string, Role>;
  default_permissions: number;
  icon?: AutumnFile;
  banner?: AutumnFile;
  flags?: number;
  nsfw: boolean;
  analytics: boolean;
  discoverable: boolean;
};

type Role = {
  name: string;
  colour?: string;
  hoist: boolean;
  rank: number;
};

type Member = {
  _id: MemberCompositeKey;
  joined_at: string;
  nickname?: string;
  avatar?: AutumnFile;
  timeout?: string;
};

type MemberResponseAll = {
  members: Member[];
  users: User[];
};
