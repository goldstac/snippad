import { app } from "electron";
import { autoUpdater } from "electron-updater";

export function registerUpdater() {
  if (!app.isPackaged) return; // don't check for updates in development mode
  autoUpdater.checkForUpdates();
}
