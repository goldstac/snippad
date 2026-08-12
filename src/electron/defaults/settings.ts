import { Settings } from "@shared/types/settings";

export const defaultSettings: Settings = {
  client: {
    sidebar: {
      showDividers: true,
      showNumbers: true,
      showTags: true,
    },
    actionRow: {
      showLabels: true,
    },
    icons: {
      fill: "auto",
    },
    tabs: {
      dimInactive: true,
      showBottomBorder: true,
      showExtension: true,
    },
    breadcrumbs: {
      enabled: true,
    },
  },
  editor: {
    fontFamily: "Fira Code",
    fontLigatures: true,
    fontSize: 14,
    tabSize: 2,
    minimap: { enabled: true },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    lineNumbers: "on",
    wordWrap: "on",
    cursorBlinking: "expand",
    cursorSmoothCaretAnimation: "on",
    bracketPairColorization: { enabled: true },
    formatOnPaste: true,
    formatOnType: true,
  },
};
