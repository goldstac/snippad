import { config } from "../constants/config";
import { exists, mkdir } from "./fs";

export function configDir() {
  if (!exists(config.configPath)) {
    mkdir(config.configPath);
  }
}
