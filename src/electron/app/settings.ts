import { Settings } from "@shared/types/settings";
import { config } from "@electron/constants/config";
import { defaultSettings } from "@electron/defaults/settings";
import { configDir } from "@electron/utils/configDir";
import { readFile, writeFile } from "@electron/utils/fs";

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
    configDir();
    await writeFile(settingsPath, JSON.stringify(settings));
  } catch {
    // ignore
  }
}
