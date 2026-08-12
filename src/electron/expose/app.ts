import { Theme } from "@shared/types/theme";
import { ipcRenderer } from "electron";

export const appObj = {
  // helpers: {
  //   getPlatform: () => ipcRenderer.invoke("helpers:getPlatform"),
  // },
  settings: {
    get: () => ipcRenderer.invoke("settings:get"),
    set: (settings: unknown) => ipcRenderer.invoke("settings:set", settings),
  },
  theme: {
    get: () => ipcRenderer.invoke("theme:get"),
    set: (theme: Theme) => ipcRenderer.invoke("theme:set", theme),
  },
};
