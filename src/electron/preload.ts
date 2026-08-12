import { contextBridge } from "electron";
import { appObj } from "./expose/app";
import { ipcRendererObj } from "./expose/ipcRenderer";
import { snipsObj } from "./expose/snips";

// IPC Renderer
contextBridge.exposeInMainWorld("ipcRenderer", ipcRendererObj);
// App functions
contextBridge.exposeInMainWorld("app", appObj);
// Snips
contextBridge.exposeInMainWorld("snips", snipsObj);
