import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { GistContext } from "../context/GistContext";
import { useAuth } from "../hooks/useAuth";
import {
  createGist as apiCreateGist,
  deleteGist as apiDeleteGist,
  fetchGist as apiFetchGist,
  forkGist as apiForkGist,
  starGist as apiStarGist,
  unstarGist as apiUnstarGist,
  updateGist as apiUpdateGist,
  fetchGists,
  fetchStarredGists,
} from "../lib/github";
import type {
  DraftGist,
  Gist,
  GistFile,
  GistFilter,
  NewGistInput,
  SelectedGist,
  UpdateGistInput,
} from "../types/gist";

let draftCounter = 0;

function makeDraftId(): string {
  draftCounter += 1;
  return `draft-${Date.now()}-${draftCounter}`;
}

function contentKey(gistId: string, filename: string): string {
  return `${gistId}:${filename}`;
}

export function GistProvider({ children }: { children: ReactNode }) {
  const { token, user } = useAuth();
  const [gists, setGists] = useState<Gist[]>([]);
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());
  const [selectedGist, setSelectedGist] = useState<SelectedGist>(null);
  const [selectedFilter, setSelectedFilter] = useState<GistFilter>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [draftContent, setDraftContentMap] = useState<Record<string, string>>(
    {},
  );
  const [draftDescription, setDraftDescriptionState] = useState("");
  const [loadedContent, setLoadedContent] = useState<Record<string, string>>(
    {},
  );
  const [dirty, setDirty] = useState(false);

  const refreshRequestId = useRef(0);

  const refresh = useCallback(async () => {
    if (!token) return;
    const requestId = refreshRequestId.current + 1;
    refreshRequestId.current = requestId;
    setLoading(true);
    setError(null);
    try {
      const [all, starred] = await Promise.all([
        fetchGists({ token }),
        fetchStarredGists(token),
      ]);
      if (refreshRequestId.current !== requestId) return;
      setGists(all);
      setStarredIds(new Set(starred.map((g) => g.id)));
    } catch (err) {
      if (refreshRequestId.current !== requestId) return;
      setError(err instanceof Error ? err.message : "Failed to load gists");
    } finally {
      if (refreshRequestId.current === requestId) setLoading(false);
    }
  }, [token]);

  const dismissError = useCallback(() => setError(null), []);

  const setFilter = (filter: GistFilter) => {
    setSelectedFilter(filter);
    setSelectedTag(null);
  };

  const setTag = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) setSelectedFilter("tag");
  };

  const selectGist = (gist: SelectedGist) => {
    setSelectedGist(gist);
    setDraftContentMap({});
    setDraftDescriptionState(gist?.description || "");
    setDirty(false);
  };

  const loadGistContent = useCallback(
    async (gist: Gist) => {
      if (!token) return;
      const needsFetch = Object.values(gist.files).some(
        (f) => f.content == null || f.content === "" || f.truncated,
      );
      if (!needsFetch) return;
      setContentLoading(true);
      try {
        const full = await apiFetchGist(token, gist.id);
        const newContent: Record<string, string> = {};
        for (const [filename, file] of Object.entries(full.files)) {
          if (file.content !== undefined) {
            newContent[contentKey(gist.id, filename)] = file.content;
          }
        }
        setLoadedContent((prev) => ({ ...prev, ...newContent }));
        setGists((prev) =>
          prev.map((g) =>
            g.id === gist.id
              ? { ...g, files: { ...g.files, ...full.files } }
              : g,
          ),
        );
        setSelectedGist((prev) =>
          prev && prev.id === gist.id
            ? { ...prev, files: { ...prev.files, ...full.files } }
            : prev,
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load gist content",
        );
      } finally {
        setContentLoading(false);
      }
    },
    [token],
  );

  const ensureAllContentLoaded = useCallback(async () => {
    if (!token) return;
    const needFetch = gists.filter((g) =>
      Object.values(g.files).some(
        (f) =>
          loadedContent[contentKey(g.id, f.filename)] === undefined &&
          (f.content == null || f.content === "" || f.truncated),
      ),
    );
    if (needFetch.length === 0) return;
    await Promise.all(needFetch.map((g) => loadGistContent(g)));
  }, [token, gists, loadedContent, loadGistContent]);

  const setDraftContent = (filename: string, content: string) => {
    setDraftContentMap((prev) => ({ ...prev, [filename]: content }));
    setDirty(true);
  };

  const setDraftDescription = (desc: string) => {
    setDraftDescriptionState(desc);
    setDirty(true);
  };

  const createDraftGist = (
    filename: string,
    isPublic: boolean,
    description: string = "",
  ) => {
    const id = makeDraftId();
    const emptyFile: GistFile = {
      filename,
      language: "plaintext",
      raw_url: "",
      size: 0,
      content: "",
    };
    const draft: DraftGist = {
      id,
      description,
      public: isPublic,
      files: { [filename]: emptyFile },
      isDraft: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      owner: {
        login: user?.login || "me",
        avatar_url: user?.avatar_url || "",
        html_url: user?.html_url || "",
      },
      html_url: "",
      comments: 0,
      tags: [],
    };
    setSelectedGist(draft);
    setDraftDescriptionState(description);
    setDraftContentMap({ [filename]: "" });
    setDirty(true);
  };

  const createGist = useCallback(
    async (input: NewGistInput): Promise<Gist | null> => {
      if (!token) return null;
      try {
        const created = await apiCreateGist(token, input);
        setGists((prev) => [created, ...prev]);
        setSelectedGist(created);
        return created;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create gist");
        return null;
      }
    },
    [token],
  );

  const applyRemoteUpdate = useCallback(
    async (
      input: UpdateGistInput,
      errorMessage: string,
    ): Promise<Gist | null> => {
      if (!token || !selectedGist || "isDraft" in selectedGist) return null;
      try {
        const updated = await apiUpdateGist({
          token,
          id: selectedGist.id,
          input,
        });
        setGists((prev) =>
          prev.map((g) => (g.id === updated.id ? updated : g)),
        );
        setSelectedGist(updated);
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : errorMessage);
        return null;
      }
    },
    [token, selectedGist],
  );

  const saveGist = useCallback(async () => {
    if (!token || !selectedGist) return;
    const isDraft = "isDraft" in selectedGist && selectedGist.isDraft;

    if (isDraft) {
      const files: Record<string, { content: string }> = {};
      for (const [filename, file] of Object.entries(selectedGist.files)) {
        const raw = draftContent[filename] ?? file.content ?? "";
        files[filename] = { content: raw.length > 0 ? raw : "// new file\n" };
      }
      if (Object.keys(files).length === 0) return;

      const created = await createGist({
        description: draftDescription,
        public: selectedGist.public,
        files,
      });
      if (created) {
        setDraftContentMap({});
        setDirty(false);
      }
      return;
    }

    const updateFiles: UpdateGistInput["files"] = {};
    for (const [filename, content] of Object.entries(draftContent)) {
      updateFiles[filename] = { content };
    }
    const input: UpdateGistInput = {
      description:
        draftDescription !== selectedGist.description
          ? draftDescription
          : undefined,
      files: Object.keys(updateFiles).length > 0 ? updateFiles : undefined,
    };
    if (input.description === undefined && input.files === undefined) return;

    const updated = await applyRemoteUpdate(input, "Failed to save gist");
    if (updated) {
      setDraftContentMap({});
      setDirty(false);
    }
  }, [
    token,
    selectedGist,
    draftContent,
    draftDescription,
    createGist,
    applyRemoteUpdate,
  ]);

  const removeGist = useCallback(
    async (id: string): Promise<boolean> => {
      if (!token) return false;
      const previous = gists;
      setGists((prev) => prev.filter((g) => g.id !== id));
      if (selectedGist?.id === id) setSelectedGist(null);
      try {
        await apiDeleteGist(token, id);
        return true;
      } catch (err) {
        setGists(previous);
        setError(err instanceof Error ? err.message : "Failed to delete gist");
        return false;
      }
    },
    [token, gists, selectedGist],
  );

  const toggleStar = useCallback(
    async (gist: Gist) => {
      if (!token) return;
      const isStarred = starredIds.has(gist.id);
      const previous = starredIds;
      setStarredIds((prev) => {
        const next = new Set(prev);
        if (isStarred) next.delete(gist.id);
        else next.add(gist.id);
        return next;
      });
      try {
        if (isStarred) await apiUnstarGist(token, gist.id);
        else await apiStarGist(token, gist.id);
      } catch (err) {
        setStarredIds(previous);
        setError(err instanceof Error ? err.message : "Failed to toggle star");
      }
    },
    [token, starredIds],
  );

  const forkGist = useCallback(
    async (gist: Gist) => {
      if (!token) return;
      try {
        const forked = await apiForkGist(token, gist.id);
        setGists((prev) => [forked, ...prev]);
        setSelectedGist(forked);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fork gist");
      }
    },
    [token],
  );

  const addFileToGist = useCallback(
    async (filename: string, content: string) => {
      if (!token || !selectedGist) return;
      if (!filename.trim()) {
        setError("Filename cannot be empty.");
        return;
      }
      if (Object.keys(selectedGist.files).some((f) => f === filename)) {
        setError(`A file named "${filename}" already exists in this gist.`);
        return;
      }
      const safeContent = content.length > 0 ? content : "// new file\n";

      if ("isDraft" in selectedGist) {
        const newFile: GistFile = {
          filename,
          language: "plaintext",
          raw_url: "",
          size: safeContent.length,
          content: safeContent,
        };
        setSelectedGist({
          ...selectedGist,
          files: { ...selectedGist.files, [filename]: newFile },
        });
        setDraftContentMap((prev) => ({ ...prev, [filename]: safeContent }));
        return;
      }

      await applyRemoteUpdate(
        { files: { [filename]: { content: safeContent } } },
        "Failed to add file",
      );
    },
    [token, selectedGist, applyRemoteUpdate],
  );

  const removeFileFromGist = useCallback(
    async (filename: string) => {
      if (!token || !selectedGist) return;
      if (Object.keys(selectedGist.files).length <= 1) {
        setError("A gist must have at least one file.");
        return;
      }

      if ("isDraft" in selectedGist) {
        const newFiles = { ...selectedGist.files };
        delete newFiles[filename];
        setSelectedGist({ ...selectedGist, files: newFiles });
        setDraftContentMap((prev) => {
          const next = { ...prev };
          delete next[filename];
          return next;
        });
        return;
      }

      await applyRemoteUpdate(
        { files: { [filename]: null } },
        "Failed to remove file",
      );
    },
    [token, selectedGist, applyRemoteUpdate],
  );

  const renameFile = useCallback(
    async (oldName: string, newName: string) => {
      if (!token || !selectedGist) return;
      if (!newName.trim()) {
        setError("Filename cannot be empty.");
        return;
      }
      if (oldName === newName) return;
      if (Object.keys(selectedGist.files).some((f) => f === newName)) {
        setError(`A file named "${newName}" already exists in this gist.`);
        return;
      }

      if ("isDraft" in selectedGist) {
        const newFiles: Record<string, GistFile> = {};
        for (const [name, file] of Object.entries(selectedGist.files)) {
          newFiles[name === oldName ? newName : name] =
            name === oldName ? { ...file, filename: newName } : file;
        }
        setSelectedGist({ ...selectedGist, files: newFiles });
        setDraftContentMap((prev) => {
          const next: Record<string, string> = {};
          for (const [name, content] of Object.entries(prev)) {
            next[name === oldName ? newName : name] = content;
          }
          return next;
        });
        return;
      }

      await applyRemoteUpdate(
        { files: { [oldName]: { filename: newName } } },
        "Failed to rename file",
      );
    },
    [token, selectedGist, applyRemoteUpdate],
  );

  const toggleVisibility = useCallback(async () => {
    setError(
      "GitHub doesn't support changing a gist's visibility after creation. Create a new gist with the desired visibility instead.",
    );
  }, []);

  const allTags = useMemo(
    () => Array.from(new Set(gists.flatMap((g) => g.tags))).sort(),
    [gists],
  );

  const filteredGists = useMemo(
    () =>
      gists.filter((g) => {
        if (selectedFilter === "starred" && !starredIds.has(g.id)) return false;
        if (selectedFilter === "public" && !g.public) return false;
        if (selectedFilter === "secret" && g.public) return false;
        if (selectedTag && !g.tags.includes(selectedTag)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const inDesc = (g.description || "").toLowerCase().includes(q);
          const inFile = Object.keys(g.files).some((f) =>
            f.toLowerCase().includes(q),
          );
          if (!inDesc && !inFile) return false;
        }
        return true;
      }),
    [gists, selectedFilter, selectedTag, searchQuery, starredIds],
  );

  return (
    <GistContext.Provider
      value={{
        gists,
        starredIds,
        selectedGist,
        selectedFilter,
        selectedTag,
        searchQuery,
        loading,
        error,
        contentLoading,
        dirty,
        draftContent,
        draftDescription,
        loadedContent,
        setFilter,
        setTag,
        setSearchQuery,
        selectGist,
        loadGistContent,
        ensureAllContentLoaded,
        setDraftContent,
        setDraftDescription,
        saveGist,
        createDraftGist,
        addFileToGist,
        removeFileFromGist,
        renameFile,
        toggleVisibility,
        createGist,
        removeGist,
        toggleStar,
        forkGist,
        refresh,
        dismissError,
        allTags,
        filteredGists,
      }}
    >
      {children}
    </GistContext.Provider>
  );
}
