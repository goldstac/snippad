import { app } from "../../electron/expose/app";
import { ipcRendererObj } from "../../electron/expose/ipcRenderer";

declare global {
  interface Window {
    app: typeof app;
    ipcRenderer: typeof ipcRendererObj;
  }
}
