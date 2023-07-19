type Role = {
  name: string;
  colour?: string;
  hoist: boolean;
  rank: number;
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
