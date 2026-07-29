import { SidebarStateType } from "@/zustand/types/sidebar";
import { create } from "zustand";

export const useSidebarState = create<SidebarStateType>((set) => ({
  isSidebarOpen: true,
  setSidebarState: (to) =>
    set((state) => ({
      isSidebarOpen: to !== undefined ? to : !state.isSidebarOpen,
    })),
}));
