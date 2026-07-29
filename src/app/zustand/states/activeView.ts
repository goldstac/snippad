import { create } from "zustand";
import { ActiveViewStateType } from "../types/activeView";

export const useActiveView = create<ActiveViewStateType>((set) => ({
  activeView: "all",
  setActiveView: (newView) => set({ activeView: newView }),
}));
