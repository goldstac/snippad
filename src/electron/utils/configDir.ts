import { config } from "@electron/constants/config";
import { exists, mkdir } from "./fs";

export function configDir() {
  if (!exists(config.configPath)) {
    mkdir(config.configPath);
  }
}
