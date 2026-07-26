import { editor } from "monaco-editor";

export type MonacoTheme = editor.IStandaloneThemeData;

export interface Theme {
  name: string;
  description: string;
  author: string;
  theme: Partial<{
    client: {
      [key: string]: string;
    };
    editor: MonacoTheme;
  }>;
}
