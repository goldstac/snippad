import { create } from "zustand";
import { ModalHistoryStep, ModalState, OpenModalType } from "./types";

export const useModal = create<ModalState>((set, get) => ({
  type: null,
  title: "Modal",
  data: null,
  path: [],

  openModal: ({ type, title, data, path }: OpenModalType) => {
    set({
      type,
      title,
      data,
      path: path ? [...get().path, path] : get().path,
    });
  },

  closeModal: () => {
    const currentPath = get().path;

    if (currentPath.length === 0) {
      set({ type: null, title: "Modal", data: null, path: [] });
    } else {
      const prevPath = currentPath[currentPath.length - 1];

      set({
        type: prevPath.type,
        title: prevPath.title,
        data: prevPath.data,
        path: currentPath.slice(0, -1),
      });
    }
  },

  setPath: (path: ModalHistoryStep[]) => set({ path }),
}));
