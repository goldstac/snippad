import { create } from "zustand";
import { SidebarStateType } from "./sidebar.types";

export const useSidebarState = create<SidebarStateType>((set) => ({
  isSidebarOpen: true,
  setSidebarState: (to) =>
    set((state) => ({
      isSidebarOpen: to !== undefined ? to : !state.isSidebarOpen,
    })),
}));
