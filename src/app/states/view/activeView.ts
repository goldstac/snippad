import { create } from "zustand";
import { ActiveViewStateType } from "./activeView.types";

export const useActiveView = create<ActiveViewStateType>((set) => ({
  activeView: "all",
  setActiveView: (newView) => set({ activeView: newView }),
}));
