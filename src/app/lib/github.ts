import { API_BASE } from "@/constants/api";
import type {
  Gist,
  GitHubUser,
  NewGistInput,
  UpdateGistInput,
} from "@/types/gist";

interface FetchOptions extends RequestInit {
  token: string;
}

async function githubFetch(
  path: string,
  options: FetchOptions,
): Promise<Response> {
  const { token, headers, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      ...headers,
    },
  });
  return response;
}

export interface TokenValidation {
  valid: boolean;
  error?: string;
  scopes?: string[];
}

export async function validateToken(token: string): Promise<TokenValidation> {
  try {
    const response = await fetch(`${API_BASE}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const scopesHeader = response.headers.get("X-OAuth-Scopes") || "";
    const scopes = scopesHeader
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!response.ok) {
      if (response.status === 401) {
        return {
          valid: false,
          error: "Invalid token. Check the token and try again.",
        };
      }
      return { valid: false, error: `GitHub API error (${response.status}).` };
    }

    if (scopes.length > 0 && !scopes.includes("gist")) {
      return {
        valid: false,
        error:
          'This token is missing the "gist" scope. Recreate it with the gist scope enabled.',
        scopes,
      };
    }

    return { valid: true, scopes };
  } catch {
    return {
      valid: false,
      error: "Network error. Check your connection and try again.",
    };
  }
}

export async function fetchUser(token: string): Promise<GitHubUser> {
  const response = await githubFetch("/user", { token });
  if (!response.ok)
    throw new Error(`Failed to fetch user (${response.status})`);
  return response.json();
}

export async function fetchGists({
  token,
  page = 1,
  perPage = 100,
}: {
  token: string;
  page?: number;
  perPage?: number;
}): Promise<Gist[]> {
  const response = await githubFetch(
    `/gists?per_page=${perPage}&page=${page}`,
    { token },
  );
  if (!response.ok)
    throw new Error(`Failed to fetch gists (${response.status})`);
  const data: Gist[] = await response.json();
  return data.map(normalizeGist);
}

export async function fetchStarredGists(token: string): Promise<Gist[]> {
  const response = await githubFetch("/gists/starred", { token });
  if (!response.ok)
    throw new Error(`Failed to fetch starred gists (${response.status})`);
  const data: Gist[] = await response.json();
  return data.map(normalizeGist);
}

export async function fetchGist(token: string, id: string): Promise<Gist> {
  const response = await githubFetch(`/gists/${id}`, { token });
  if (!response.ok)
    throw new Error(`Failed to fetch gist (${response.status})`);
  const data = await response.json();
  return normalizeGist(data);
}

export async function fetchFileContent(
  rawUrl: string,
  token: string,
): Promise<string> {
  const response = await fetch(rawUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!response.ok)
    throw new Error(`Failed to fetch file content (${response.status})`);
  return response.text();
}

export async function createGist(
  token: string,
  input: NewGistInput,
): Promise<Gist> {
  const response = await githubFetch("/gists", {
    token,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      err.message || `Failed to create gist (${response.status})`,
    );
  }
  const data = await response.json();
  return normalizeGist(data);
}

export async function updateGist({
  token,
  id,
  input,
}: {
  token: string;
  id: string;
  input: UpdateGistInput;
}): Promise<Gist> {
  const body = JSON.stringify(input);
  const response = await githubFetch(`/gists/${id}`, {
    token,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (!response.ok) {
    const raw = await response.text();
    let detail = raw;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.message) detail = parsed.message;
      if (Array.isArray(parsed.errors) && parsed.errors.length > 0) {
        detail +=
          " — " +
          parsed.errors
            .map((e: { resource?: string; field?: string; code?: string }) =>
              [e.resource, e.field, e.code].filter(Boolean).join(":"),
            )
            .join("; ");
      }
    } catch {
      // keep raw
    }
    throw new Error(detail || `Failed to update gist (${response.status})`);
  }
  const data = await response.json();
  return normalizeGist(data);
}

export async function deleteGist(token: string, id: string): Promise<void> {
  const response = await githubFetch(`/gists/${id}`, {
    token,
    method: "DELETE",
  });
  if (!response.ok && response.status !== 204) {
    throw new Error(`Failed to delete gist (${response.status})`);
  }
}

export async function starGist(token: string, id: string): Promise<void> {
  const response = await githubFetch(`/gists/${id}/star`, {
    token,
    method: "PUT",
    headers: { "Content-Length": "0" },
  });
  if (!response.ok) throw new Error(`Failed to star gist (${response.status})`);
}

export async function unstarGist(token: string, id: string): Promise<void> {
  const response = await githubFetch(`/gists/${id}/star`, {
    token,
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error(`Failed to unstar gist (${response.status})`);
}

export async function forkGist(token: string, id: string): Promise<Gist> {
  const response = await githubFetch(`/gists/${id}/forks`, {
    token,
    method: "POST",
  });
  if (!response.ok) throw new Error(`Failed to fork gist (${response.status})`);
  const data = await response.json();
  return normalizeGist(data);
}

export async function isGistStarred(
  token: string,
  id: string,
): Promise<boolean> {
  const response = await githubFetch(`/gists/${id}/star`, { token });
  return response.status === 204;
}

function extractTags(description?: string | null): string[] {
  const matches = (description || "").match(/#(\w+)/g) || [];
  return matches.map((t) => t.slice(1));
}

function normalizeGist(raw: Gist): Gist {
  return {
    ...raw,
    tags: extractTags(raw.description),
  };
}
