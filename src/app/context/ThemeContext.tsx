import { createContext, Dispatch, useContext } from "react";
import { Theme } from "../../shared/types/theme";

type ThemeContextValue = {
  theme: Theme | null;
  setTheme: Dispatch<React.SetStateAction<Theme | null>>;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
