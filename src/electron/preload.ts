import { contextBridge } from "electron";
import { appObj } from "./expose/app";
import { ipcRendererObj } from "./expose/ipcRenderer";
import { snipsObj } from "./expose/snips";
import { storeObj } from "./expose/store";

// IPC Renderer
contextBridge.exposeInMainWorld("ipcRenderer", ipcRendererObj);
// App functions
contextBridge.exposeInMainWorld("app", appObj);
// Snips
contextBridge.exposeInMainWorld("snips", snipsObj);
// Electron store
contextBridge.exposeInMainWorld("store", storeObj);
