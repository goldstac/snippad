import { ipcRenderer } from "electron";

export const storeObj = {
  get: (key: string) => ipcRenderer.invoke("store:get", key),
  set: (key: string, value: string) =>
    ipcRenderer.invoke("store:set", key, value),
  remove: (key: string) => ipcRenderer.invoke("store:remove", key),
};
