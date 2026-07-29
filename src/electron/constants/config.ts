import pkg from "@pkg" with { type: "json" };
import { homedir } from "os";
import path from "path";

const { name } = pkg;

export const config = {
  configPath: path.join(homedir(), `.${name.toLowerCase()}`),
  settings: path.join(homedir(), `.${name.toLowerCase()}`, "settings.json"),
  theme: path.join(homedir(), `.${name.toLowerCase()}`, "theme.json"),
};
