import { homedir } from "os";
import path from "path";

export const config = {
  base: path.join(homedir(), ".snipbase"),
  settings: path.join(homedir(), ".snipbase", "settings.json"),
  theme: path.join(homedir(), ".snipbase", "theme.json"),
  snips: {
    base: path.join(homedir(), ".snipbase", "snips"),
    metadata: "__snip_metadata",
  },
};
