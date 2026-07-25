import { contextBridge } from "electron";
import { appObj } from "./expose/app";
import { ipcRendererObj } from "./expose/ipcRenderer";

// IPC Renderer
contextBridge.exposeInMainWorld("ipcRenderer", ipcRendererObj);
// App functions
contextBridge.exposeInMainWorld("app", appObj);
