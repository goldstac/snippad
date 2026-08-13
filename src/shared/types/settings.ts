import { editor } from "monaco-editor";

export type Settings = Partial<{
  name: string;
  client: {
    breadcrumb: {
      enabled: boolean;
    };
    icons: {
      fill: boolean | "auto";
    };
    actionRow: {
      showLabels: boolean;
    };
    tabs: {
      showBottomBorder: boolean;
      showExtension: boolean;
      dimInactive: boolean;
    };
    sidebar: {
      showNumbers: boolean;
      showTags: boolean;
      showDividers: boolean;
    };
  };
  editor: editor.IStandaloneEditorConstructionOptions;
}>;

export type SettingKey = keyof Settings;
