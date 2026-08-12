export type EditorState = {
  content: string;
  activeFile: string;
  setContent: (content: string) => void;
  setActiveFile: (activeFile: string) => void;
};
