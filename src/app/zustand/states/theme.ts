import { create } from "zustand";
import { Theme } from "../../../shared/types/theme";
import { applyTheme } from "../../lib/theme";
import { ThemeState } from "../types/theme";

export const useTheme = create<ThemeState>((set, get) => ({
  theme: null,

  loadTheme: async () => {
    try {
      const initialTheme = await window.app.theme.get();
      set({ theme: initialTheme });
      applyTheme(initialTheme);
    } catch (error) {
      console.error("Failed to get theme: ", error);
    }
  },

  getTheme: async () => {
    return get().theme;
  },

  setTheme: async (newTheme: Theme) => {
    try {
      await window.app.theme.set(newTheme);
    } catch (error) {
      console.error("Failed to set theme: ", error);
    } finally {
      set({ theme: newTheme });
    }
  },
}));
