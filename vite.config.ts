import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";

export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(),
    electron({
      main: {
        entry: "src/electron/main.ts",
      },
      preload: {
        input: path.join(__dirname, "src/electron/preload.ts"),
      },
      renderer: process.env.NODE_ENV === "test" ? undefined : {},
    }),
  ],
  base: "./",
});
