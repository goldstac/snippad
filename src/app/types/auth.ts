import { GitHubUser } from "./gist";

export type AuthStatus =
  | "idle"
  | "validating"
  | "authenticated"
  | "unauthenticated";

export interface AuthContextValue {
  token: string | null;
  user: GitHubUser | null;
  status: AuthStatus;
  authError: string | null;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
}
