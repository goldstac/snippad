import { appObj } from "../../electron/expose/app";
import { ipcRendererObj } from "../../electron/expose/ipcRenderer";

declare global {
  interface Window {
    app: typeof appObj;
    ipcRenderer: typeof ipcRendererObj;
  }
}
