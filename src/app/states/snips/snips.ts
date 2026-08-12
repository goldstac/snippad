import { CreateSnipInput, Snip, UpdateSnipInput } from "@shared/types/snippets";
import { create } from "zustand";
import { SnipState } from "./types";

export const useSnip = create<SnipState>((set, get) => ({
  snips: null,
  filteredSnips: null,
  activeSnip: null,

  get: async (id?: string) => {
    try {
      if (!id) return undefined;
      return await window.snips.get(id);
    } catch (error) {
      console.error("Could not get snip: ", error);
      return undefined;
    }
  },

  getAll: async () => {
    try {
      return await window.snips.getAll();
    } catch (error) {
      console.error("Could not get snips: ", error);
      return [];
    }
  },

  loadSnips: async () => {
    try {
      const snips = await get().getAll();
      set({ snips: snips ?? [], filteredSnips: snips ?? [] });
    } catch (error) {
      console.error("Could not load snips: ", error);
    }
  },

  create: async (snipInput: CreateSnipInput) => {
    try {
      const newSnip = await window.snips.create(snipInput);
      if (newSnip) {
        await get().loadSnips();
      }
      return newSnip;
    } catch (error) {
      console.error("Could not create snip: ", error);
      return undefined;
    }
  },

  update: async (id: string, snipInput: UpdateSnipInput) => {
    try {
      const updatedSnip = await window.snips.update(id, snipInput);
      if (updatedSnip) {
        await get().loadSnips();
      }
      return updatedSnip;
    } catch (error) {
      console.error("Could not update snip: ", error);
      return undefined;
    }
  },

  delete: async (id: string) => {
    try {
      const success = await window.snips.delete(id);
      if (success) {
        if (get().activeSnip === id) {
          set({ activeSnip: null });
        }
        await get().loadSnips();
      }
      return success;
    } catch (error) {
      console.error("Could not delete snip: ", error);
      return false;
    }
  },

  star: async (id: string) => {
    try {
      const updatedSnip = await window.snips.star(id);
      if (updatedSnip) {
        await get().loadSnips();
      }
      return updatedSnip;
    } catch (error) {
      console.error("Could not star snip: ", error);
      return undefined;
    }
  },

  getAllTags: () => {
    const snips = get().snips ?? [];
    const tagsSet = new Set<string>();
    for (const snip of snips) {
      if (snip.metadata?.tags) {
        for (const tag of snip.metadata.tags) {
          tagsSet.add(tag);
        }
      }
    }
    return Array.from(tagsSet).sort();
  },

  getStarred: () => {
    const snips = get().snips ?? [];
    return snips.filter((s) => Boolean(s.metadata?.starred));
  },

  setSnipFilter: (predicate?: (snip: Snip) => boolean) => {
    const snips = get().snips ?? [];
    if (!predicate) {
      set({ filteredSnips: snips });
      return;
    }
    set({ filteredSnips: snips.filter(predicate) });
  },

  setActiveSnip: (id: string | null) => {
    set({ activeSnip: id });
  },
}));
