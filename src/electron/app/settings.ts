import { config } from "@electron/constants/config";
import { defaultSettings } from "@electron/defaults/settings";
import { createBaseDir } from "@electron/utils/configDir";
import { readFile, writeFile } from "@electron/utils/fs";
import { Settings } from "@shared/types/settings";

export async function getSettings(): Promise<Settings | null> {
  try {
    const content = await JSON.parse(await readFile(config.settings));
    return { ...defaultSettings, ...content };
  } catch {
    return defaultSettings;
  }
}

export async function setSettings(settings: Settings) {
  const settingsPath = config.settings;
  try {
    createBaseDir();
    await writeFile(settingsPath, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error("Failed to set settings: ", error);
  }
}
