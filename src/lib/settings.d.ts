type Settings = {
  lowDataMode: boolean;
};

type DisplayedSetting = {
  title: string;
  description?: string;
  settingsStoreKey: keyof Settings;
};
