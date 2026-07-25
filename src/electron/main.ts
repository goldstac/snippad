import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getSettings, setSettings } from "./app/settings";
import { getTheme, setTheme } from "./app/theme";
import { getToken, removeToken, setToken } from "./store/token";
import { getPlatform } from "./utils/getPlatform";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.APP_ROOT = path.join(__dirname, "..");

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

let mainWindow: BrowserWindow | null = null;

// register IPC listeners
function registerIpcHandlers(): void {
  // helpers
  ipcMain.handle("app:getPlatform", () => getPlatform());

  // settings
  ipcMain.handle("settings:get", async () => getSettings());
  ipcMain.handle("settings:set", async (_, settings) => setSettings(settings));

  // theme
  ipcMain.handle("theme:get", async () => getTheme());
  ipcMain.handle("theme:set", async (_, theme) => setTheme(theme));

  // electron-store
  ipcMain.handle("store:getToken", async () => getToken());
  ipcMain.handle("store:setToken", async (_, token) => setToken(token));
  ipcMain.handle("store:removeToken", async () => removeToken());
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 500,
    title: "PureGist",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:") || url.startsWith("https:")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    registerIpcHandlers();
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
}

app.on("window-all-closed", () => {
  if (getPlatform() !== "mac") {
    app.quit();
  }
});
