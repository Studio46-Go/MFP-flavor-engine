import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "mfp-flavor-engine": path.resolve(__dirname, "../../src"),
    },
  },
  server: {
    fs: {
      allow: ["../.."],
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
