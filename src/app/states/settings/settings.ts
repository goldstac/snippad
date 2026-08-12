import { Settings } from "@shared/types/settings";
import { create } from "zustand";
import { SettingsState } from "./types";

export const useSettings = create<SettingsState>((set) => ({
  settings: null,

  loadSettings: async () => {
    try {
      const settings = await window.app.settings.get();
      set({ settings });
    } catch (error) {
      console.error("Failed to load settings: ", error);
    }
  },

  setSettings: async (newSettings: Settings) => {
    try {
      await window.app.settings.set(newSettings);
      set({ settings: newSettings });
    } catch (error) {
      console.error("Failed to set settings: ", error);
    }
  },
}));
