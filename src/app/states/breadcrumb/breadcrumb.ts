import { create } from "zustand";
import { BreadcrumbState } from "./breadcrumb.types";

export const useBreadcrumb = create<BreadcrumbState>((set) => ({
  base: "all",
  path: [],
  setBase: (to: string) => set({ base: to }),
  setPath: (path: string[]) => set({ path }),
}));
