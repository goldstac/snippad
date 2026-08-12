import { create } from "zustand";
import { ActiveViewType, ViewState } from "./types";

export const useView = create<ViewState>((set) => ({
  activeView: { id: "all", label: "All Snips", tag: false },
  setActiveView: (view: ActiveViewType) => set({ activeView: view }),
}));
