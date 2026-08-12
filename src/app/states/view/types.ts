export type ActiveViewType = {
  id: string;
  label: string;
  tag: boolean;
};

export type ViewState = {
  activeView: ActiveViewType;
  setActiveView: (view: ActiveViewType) => void;
};
