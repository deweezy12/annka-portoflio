import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Base path for the deployed site. Update this if you later host on a
// GitHub Pages project subpath (e.g. "/annka-portfolio/") instead of a
// custom domain or root path.
const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
});
