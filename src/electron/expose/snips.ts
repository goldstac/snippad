import { CreateSnipInput, UpdateSnipInput } from "@shared/types/snippets";
import { ipcRenderer } from "electron";

export const snipsObj = {
  get: (id?: string) => ipcRenderer.invoke("snips:get", id),
  getAll: () => ipcRenderer.invoke("snips:getAll"),
  create: (snip: CreateSnipInput) => ipcRenderer.invoke("snips:create", snip),
  update: (id: string, snip: UpdateSnipInput) =>
    ipcRenderer.invoke("snips:update", id, snip),
  delete: (id: string) => ipcRenderer.invoke("snips:delete", id),
  getAllTags: () => ipcRenderer.invoke("snips:getAllTags"),
  getStarred: () => ipcRenderer.invoke("snips:getStarred"),
  star: (id: string) => ipcRenderer.invoke("snips:star", id),
};
