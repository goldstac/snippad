import { getSettings, setSettings } from "../app/settings";
import { getTheme, setTheme } from "../app/theme";
import { getToken, removeToken, setToken } from "../store/token";
import { getPlatform } from "../utils/getPlatform";

export const app = {
  helpers: {
    getPlatform,
  },
  settings: {
    getSettings,
    setSettings,
  },
  theme: {
    getTheme,
    setTheme,
  },
  store: {
    getToken,
    setToken,
    removeToken,
  },
};
