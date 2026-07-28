import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUser, validateToken } from "../lib/github";
import { AuthStatus } from "../types/auth";
import type { GitHubUser } from "../types/gist";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("validating");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initAuth() {
      try {
        const storedToken = await window.app.store.token.get();

        if (cancelled) return;

        if (!storedToken) {
          setStatus("unauthenticated");
          return;
        }

        setStatus("validating");

        const validation = await validateToken(storedToken);
        if (cancelled) return;

        if (!validation.valid) {
          // await window.app.store.token.clear(); // clears the stored token when invalid, including network errors
          setToken(null);
          setUser(null);
          setStatus("unauthenticated");
          setAuthError(
            validation.error || "Session expired. Please sign in again.",
          );
          return;
        }

        const fetchedUser = await fetchUser(storedToken);
        if (cancelled) return;

        setToken(storedToken);
        setUser(fetchedUser);
        setStatus("authenticated");
      } catch {
        if (cancelled) return;

        await window.app.store.token.clear();
        setToken(null);
        setUser(null);
        setStatus("unauthenticated");
        setAuthError(
          "Could not load your GitHub profile. Please sign in again.",
        );
      }
    }

    initAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (newToken: string): Promise<boolean> => {
    setStatus("validating");
    setAuthError(null);

    try {
      const validation = await validateToken(newToken);
      if (!validation.valid) {
        setAuthError(validation.error || "Invalid token");
        setStatus("unauthenticated");
        return false;
      }

      const fetchedUser = await fetchUser(newToken);

      await window.app.store.token.set(newToken);

      setToken(newToken);
      setUser(fetchedUser);
      setStatus("authenticated");
      return true;
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed");
      setStatus("unauthenticated");
      return false;
    }
  };

  const logout = async () => {
    await window.app.store.token.clear();
    setToken(null);
    setUser(null);
    setStatus("unauthenticated");
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, status, authError, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
