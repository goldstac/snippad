import { CreateSnipInput, Snip, UpdateSnipInput } from "@shared/types/snippets";

// export type SnipState = {
//   snips: Snip[] | null;
//   get: (id?: string) => Promise<string[] | Snip | undefined>;
//   getAll: () => Promise<Snip[]>;
//   create: (snip: CreateSnipInput) => Promise<Snip>;
//   update: (id: string, snip: UpdateSnipInput) => Promise<Snip | undefined>;
//   delete: (id: string) => Promise<boolean>;
// };

export type SnipState = {
  snips: Snip[] | null;
  filteredSnips: Snip[] | null;
  activeSnip: string | null;
  get: (id?: string) => Promise<Snip | undefined>;
  getAll: () => Promise<Snip[]>;
  loadSnips: () => Promise<void>;
  create: (snip: CreateSnipInput) => Promise<Snip | undefined>;
  update: (id: string, snip: UpdateSnipInput) => Promise<Snip | undefined>;
  delete: (id: string) => Promise<boolean>;
  getAllTags: () => string[];
  getStarred: () => Snip[];
  setSnipFilter: (predicate?: (snip: Snip) => boolean) => void;
  setActiveSnip: (id: string | null) => void;
  star: (id: string) => Promise<void>;
};
