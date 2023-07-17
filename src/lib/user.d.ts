type RelationshipStatus =
  | 'None'
  | 'User'
  | 'Friend'
  | 'Outgoing'
  | 'Incoming'
  | 'Blocked'
  | 'BlockedOther';

type Relationship = {
  _id: string;
  status: RelationshipStatus;
};

type Presence = 'Online' | 'Idle' | 'Focus' | 'Busy' | 'Invisible';

type UserStatus = {
  text?: string;
  presence?: Presence;
};

type UserProfile = {
  content?: string;
};

type BotInformation = {
  owner: string;
};

type User = {
  _id: string;
  username: string;
  avatar?: AutumnFile;
  relations?: Relationship[];
  badges?: number;
  status?: UserStatus;
  profile?: UserProfile;
  flags?: number;
  privileged: boolean;
  bot?: BotInformation;
  relationship?: RelationshipStatus;
  online?: boolean;
};
