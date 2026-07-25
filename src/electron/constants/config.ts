import { homedir } from "os";
import path from "path";
import pkg from "../../../package.json" with { type: "json" };

const { name } = pkg;

export const config = {
  configPath: path.join(homedir(), `.${name.toLowerCase()}`),
  settings: path.join(homedir(), `.${name.toLowerCase()}`, "settings.json"),
  theme: path.join(homedir(), `.${name.toLowerCase()}`, "theme.json"),
};
