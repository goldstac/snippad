import { Theme } from "@shared/types/theme";

export type ThemeState = {
  theme: Theme | null;
  loadTheme: () => Promise<void>;
  setTheme: (newTheme: Theme) => void;
};
