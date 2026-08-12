import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CreateSnipInput, UpdateSnipInput } from "@shared/types/snippets";
import { getSettings, setSettings } from "./app/settings";
import {
  createSnip,
  deleteSnip,
  getAllSnips,
  getAllTags,
  getSnip,
  getSnips,
  getStarredSnips,
  starSnip,
  updateSnip,
} from "./app/snippets";
import { getItem, removeItem, setItem } from "./app/store";
import { getTheme, setTheme } from "./app/theme";
import { registerUpdater } from "./app/updater";
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
  // ipcMain.handle("helpers:getPlatform", () => getPlatform());

  // settings
  ipcMain.handle("settings:get", async () => getSettings());
  ipcMain.handle("settings:set", async (_, settings) => setSettings(settings));

  // theme
  ipcMain.handle("theme:get", async () => getTheme());
  ipcMain.handle("theme:set", async (_, theme) => setTheme(theme));

  // snips
  ipcMain.handle("snips:get", async (_, id?: string) =>
    id ? getSnip(id) : getSnips(),
  );
  ipcMain.handle("snips:getAll", async () => getAllSnips());
  ipcMain.handle("snips:create", async (_, snip: CreateSnipInput) =>
    createSnip(snip),
  );
  ipcMain.handle("snips:update", async (_, id: string, snip: UpdateSnipInput) =>
    updateSnip(id, snip),
  );
  ipcMain.handle("snips:delete", async (_, id: string) => deleteSnip(id));
  ipcMain.handle("snips:getAllTags", async () => getAllTags());
  ipcMain.handle("snips:getStarred", async () => getStarredSnips());
  ipcMain.handle("snips:star", async (_, id: string) => starSnip(id));

  // store
  ipcMain.handle("store:get", (_, key: string) => getItem(key));
  ipcMain.handle("store:set", (_, key: string, value: string) =>
    setItem(key, value),
  );
  ipcMain.handle("store:remove", (_, key: string) => removeItem(key));
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 500,
    title: "SnipBase",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
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
    registerUpdater();
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
