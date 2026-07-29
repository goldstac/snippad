import { ActiveViewStateType } from "@/zustand/types/activeView";
import { create } from "zustand";

export const useActiveView = create<ActiveViewStateType>((set) => ({
  activeView: "all",
  setActiveView: (newView) => set({ activeView: newView }),
}));
