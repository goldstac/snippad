import { contextBridge, ipcRenderer } from "electron";
import { ipcRendererObj } from "./expose/ipcRenderer";

// IPC Renderer
contextBridge.exposeInMainWorld("ipcRenderer", ipcRendererObj);

// App functions
contextBridge.exposeInMainWorld("app", {
  helpers: {
    getPlatform: () => ipcRenderer.invoke("app:getPlatform"),
  },
  settings: {
    getSettings: () => ipcRenderer.invoke("settings:get"),
    setSettings: (settings: unknown) =>
      ipcRenderer.invoke("settings:set", settings),
  },
  theme: {
    getTheme: () => ipcRenderer.invoke("theme:get"),
    setTheme: (theme: string) => ipcRenderer.invoke("theme:set", theme),
  },
  store: {
    getToken: () => ipcRenderer.invoke("store:getToken"),
    setToken: (token: string) => ipcRenderer.invoke("store:setToken", token),
    removeToken: () => ipcRenderer.invoke("store:removeToken"),
  },
});
