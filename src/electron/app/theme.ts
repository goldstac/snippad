import { config } from "../constants/config";
import { defaultTheme } from "../defaults/theme";
import { Theme } from "../types/theme";
import { configDir } from "../utils/configDir";
import { readFile, writeFile } from "../utils/fs";

export async function getTheme(): Promise<Theme | null> {
  try {
    const content = await JSON.parse(await readFile(config.theme));
    return { ...defaultTheme, ...content };
  } catch {
    return defaultTheme;
  }
}

export async function setTheme(theme: Theme) {
  const themePath = config.theme;
  try {
    configDir();
    await writeFile(themePath, JSON.stringify(theme));
  } catch {
    // ignore
  }
}
