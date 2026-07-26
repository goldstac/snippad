import { ReactNode, useEffect, useState } from "react";
import { Theme } from "../../shared/types/theme";
import { ThemeContext } from "../context/ThemeContext";
import { applyTheme } from "../lib/theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    async function loadTheme() {
      try {
        const initialTheme = await window.app.theme.get();
        setTheme(initialTheme);
      } catch (error) {
        console.error("Failed to get theme:", error);
      }
    }

    loadTheme();
  }, []);

  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
