import { Theme } from "@shared/types/theme";

export type ThemeState = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  loadTheme: () => void;
};
