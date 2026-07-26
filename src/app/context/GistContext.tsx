import { createContext, useContext } from "react";
import type { GistContextValue } from "../types/gist";

export const GistContext = createContext<GistContextValue | null>(null);

export function useGistsContext(): GistContextValue {
  const ctx = useContext(GistContext);
  if (!ctx) throw new Error("useGistsContext must be used within GistProvider");
  return ctx;
}
