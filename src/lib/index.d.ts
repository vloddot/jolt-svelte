type Category = {
  id: string;
  title: string;
  channels: string[];
};

type Role = {
  name: string;
  colour?: string;
  hoist: boolean;
  rank: number;
};

type SystemMessageChannels = {
  user_joined?: string;
  user_left?: string;
  user_kicked?: string;
  user_banned?: string;
};

type AutumnFileMetadata =
  | {
      type: 'File';
    }
  | {
      type: 'Text';
    }
  | {
      type: 'Image' | 'Video';
      width: number;
      height: number;
    }
  | {
      type: 'Audio';
    };

type AutumnFile = {
  _id: string;
  tag: string;
  filename: string;
  metadata: AutumnFileMetadata;
  content_type: string;
  size: number;
  deleted?: boolean;
  reported?: boolean;
};
