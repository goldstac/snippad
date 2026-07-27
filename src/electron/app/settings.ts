import { Settings } from "../../shared/types/settings";
import { config } from "../constants/config";
import { defaultSettings } from "../defaults/settings";
import { configDir } from "../utils/configDir";
import { readFile, writeFile } from "../utils/fs";

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
