import { Settings } from "@shared/types/settings";

export type SettingsState = {
  settings: Settings | null;
  loadSettings: () => void;
  setSettings: (settings: Settings) => void;
};
