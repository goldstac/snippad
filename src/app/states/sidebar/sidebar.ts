import { create } from "zustand";
import { SidebarState } from "./types";

export const useSidebarState = create<SidebarState>((set, get) => ({
  isSidebarOpen: false,
  toggleSidebarState: () => set({ isSidebarOpen: !get().isSidebarOpen }),
  setSidebarState: (state: boolean) => set({ isSidebarOpen: state }),
}));
