import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/monaco-editor/min/vs",
          dest: "monaco",
        },
      ],
      watch: {
        reloadPageOnChange: true,
      },
    }),
    electron({
      main: {
        entry: "src/electron/main.ts",
      },
      preload: {
        input: path.join(import.meta.dirname, "src/electron/preload.ts"),
      },
      renderer: process.env.NODE_ENV === "test" ? undefined : {},
    }),
  ],
  base: "./",
});
