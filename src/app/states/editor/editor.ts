import { create } from "zustand";
import { EditorState } from "./types";

export const useEditor = create<EditorState>((set) => ({
  content: "",
  activeFile: "",
  setContent: (content: string) => set({ content }),
  setActiveFile: (activeFile: string) => set({ activeFile }),
}));
