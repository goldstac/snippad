import { create } from "zustand";
import { SidebarStateType } from "../types/sidebar";

export const useSidebarState = create<SidebarStateType>((set) => ({
  isSidebarOpen: true,
  setSidebarState: (to) =>
    set((state) => ({
      isSidebarOpen: to !== undefined ? to : !state.isSidebarOpen,
    })),
}));
