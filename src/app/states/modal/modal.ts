import { create } from "zustand";
import { ModalState, OpenModalType } from "./types";

export const useModal = create<ModalState>((set) => ({
  type: null,
  title: "Modal",
  openModal: ({ type, title, data }: OpenModalType) =>
    set({ type, title, data }),
  closeModal: () => set({ type: null, title: "Modal", data: null }),
}));
