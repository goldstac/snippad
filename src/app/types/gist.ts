export interface GistFile {
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  content: string;
  truncated?: boolean;
}

export interface GistOwner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Gist {
  id: string;
  description: string | null;
  public: boolean;
  created_at: string;
  updated_at: string;
  files: Record<string, GistFile>;
  owner: GistOwner;
  html_url: string;
  comments: number;
  tags: string[];
}

export type GistFilter = "all" | "starred" | "public" | "secret" | "tag";

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_gists: number;
}

export interface NewGistInput {
  description: string;
  public: boolean;
  files: Record<string, { content: string }>;
}

export interface UpdateGistInput {
  description?: string;
  files?: Record<string, { content?: string; filename?: string } | null>;
}

////

export interface DraftGist {
  id: string;
  description: string;
  public: boolean;
  files: Record<string, GistFile>;
  isDraft: true;
  created_at: string;
  updated_at: string;
  owner: { login: string; avatar_url: string; html_url: string };
  html_url: string;
  comments: number;
  tags: string[];
}

export type SelectedGist = Gist | DraftGist | null;

export interface GistContextValue {
  gists: Gist[];
  starredIds: Set<string>;
  selectedGist: SelectedGist;
  selectedFilter: GistFilter;
  selectedTag: string | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  contentLoading: boolean;
  dirty: boolean;
  draftContent: Record<string, string>;
  draftDescription: string;
  loadedContent: Record<string, string>;
  setFilter: (filter: GistFilter) => void;
  setTag: (tag: string | null) => void;
  setSearchQuery: (q: string) => void;
  selectGist: (gist: SelectedGist) => void;
  loadGistContent: (gist: Gist) => Promise<void>;
  ensureAllContentLoaded: () => Promise<void>;
  setDraftContent: (filename: string, content: string) => void;
  setDraftDescription: (desc: string) => void;
  saveGist: () => Promise<void>;
  createDraftGist: (
    filename: string,
    isPublic: boolean,
    description?: string,
  ) => void;
  addFileToGist: (filename: string, content: string) => Promise<void>;
  removeFileFromGist: (filename: string) => Promise<void>;
  renameFile: (oldName: string, newName: string) => Promise<void>;
  toggleVisibility: () => Promise<void>;
  createGist: (input: NewGistInput) => Promise<Gist | null>;
  removeGist: (id: string) => Promise<boolean>;
  toggleStar: (gist: Gist) => Promise<void>;
  forkGist: (gist: Gist) => Promise<void>;
  refresh: () => Promise<void>;
  dismissError: () => void;
  allTags: string[];
  filteredGists: Gist[];
}
