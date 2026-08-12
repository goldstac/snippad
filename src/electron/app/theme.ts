import { config } from "@electron/constants/config";
import { defaultTheme } from "@electron/defaults/theme";
import { createBaseDir } from "@electron/utils/configDir";
import { readFile, writeFile } from "@electron/utils/fs";
import { Theme } from "@shared/types/theme";

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
    createBaseDir();
    await writeFile(themePath, JSON.stringify(theme, null, 2));
  } catch (error) {
    console.error("Failed to set theme: ", error);
  }
}
