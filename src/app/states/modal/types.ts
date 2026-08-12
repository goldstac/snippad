export type ModalType =
  | "themes"
  | "settings"
  | "about"
  | "changelog"
  | "newfile"
  | "fileaction"
  | "deleteconfirm"
  | "editsnip"
  | "newsnip"
  | null;

export interface OpenModalType {
  type: NonNullable<ModalType>;
  title: string;
  data?: Record<string, string> | null;
}

export interface ModalState extends Omit<OpenModalType, "type"> {
  type: ModalType;
  openModal: ({ type, title }: OpenModalType) => void;
  closeModal: () => void;
}
