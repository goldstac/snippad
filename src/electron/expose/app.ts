import { ipcRenderer } from "electron";

export const appObj = {
  helpers: {
    getPlatform: () => ipcRenderer.invoke("app:getPlatform"),
  },
  settings: {
    get: () => ipcRenderer.invoke("settings:get"),
    set: (settings: unknown) => ipcRenderer.invoke("settings:set", settings),
  },
  theme: {
    get: () => ipcRenderer.invoke("theme:get"),
    set: (theme: string) => ipcRenderer.invoke("theme:set", theme),
  },
  store: {
    token: {
      get: () => ipcRenderer.invoke("store:getToken"),
      set: (token: string) => ipcRenderer.invoke("store:setToken", token),
      clear: () => ipcRenderer.invoke("store:removeToken"),
    },
  },
};
