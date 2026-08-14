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
  | "announcement"
  | null;

export type ModalHistoryStep = {
  type: NonNullable<ModalType>;
  title: string;
  data?: Record<string, string> | null;
};

export type OpenModalType = ModalHistoryStep & {
  path?: ModalHistoryStep;
};

export type ModalState = {
  type: ModalType;
  title: string;
  data?: Record<string, string> | null;
  path: ModalHistoryStep[];
  openModal: (args: OpenModalType) => void;
  closeModal: () => void;
  setPath: (path: ModalHistoryStep[]) => void;
};
