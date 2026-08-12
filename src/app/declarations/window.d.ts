import { appObj } from "@electron/expose/app";
import { ipcRendererObj } from "@electron/expose/ipcRenderer";
import { snipsObj } from "@electron/expose/snips";

declare global {
  interface Window {
    app: typeof appObj;
    ipcRenderer: typeof ipcRendererObj;
    snips: typeof snipsObj;
  }
}
