import { config } from "@electron/constants/config";
import { exists, mkdir } from "./fs";

export function createBaseDir() {
  try {
    if (!exists(config.base)) {
      mkdir(config.base);
    }
  } catch (err) {
    console.error(err);
  }
}

export function createSnippetsDir() {
  try {
    createBaseDir();

    if (!exists(config.snips.base)) {
      mkdir(config.snips.base);
    }
  } catch (err) {
    console.log(err);
  }
}
