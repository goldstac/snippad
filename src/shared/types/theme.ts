import { editor } from "monaco-editor";

export type MonacoTheme = {
  base: "vs" | "vs-dark" | "hc-black" | "hc-light";
  inherit?: boolean;
  rules?: editor.ITokenThemeRule[];
  colors?: { [colorId: string]: string };
};

export interface Theme {
  name: string;
  description: string;
  author: string;
  theme: Partial<{
    type: "dark" | "light";
    client: {
      backgroundPrimary: string;
      backgroundSecondary: string;
      backgroundTertiary: string;
      overlayColor: string;
      borderColor: string;
      borderColorSubtle: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      accentColor: string;
      accentColorHover: string;
      accentColorMuted: string;
      danger: string;
      dangerHover: string;
      success: string;
      warning: string;
      inputBackground: string;
      scrollbarThumb: string;
      scrollbarTrack: string;
      shadow: string;
    };
    editor: MonacoTheme;
  }>;
}
