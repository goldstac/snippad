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

export type OpenModalType = {
  type: NonNullable<ModalType>;
  title: string;
  data?: { [key: string]: string } | null;
};

export type ModalState = {
  type: ModalType;
  title: string;
  data?: { [key: string]: string } | null;
  openModal: ({ type, title }: OpenModalType) => void;
  closeModal: () => void;
};
