import { homedir } from "os";
import path from "path";

export const config = {
  base: path.join(homedir(), ".snippad"),
  settings: path.join(homedir(), ".snippad", "settings.json"),
  theme: path.join(homedir(), ".snippad", "theme.json"),
  snips: {
    base: path.join(homedir(), ".snippad", "snips"),
    metadata: "__snip_metadata",
  },
};
