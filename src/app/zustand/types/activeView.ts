import { ViewTypes } from "../../types/app";

export type ActiveViewStateType = {
  activeView: ViewTypes;
  setActiveView: (newView: ViewTypes) => void;
};
