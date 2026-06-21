import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static React build for GitHub Pages.
// base must match the Pages sub-path: https://<owner>.github.io/male-delusion-calc/
export default defineConfig({
  base: "/male-delusion-calc/",
  plugins: [react()],
  build: {
    outDir: "dist",
    // The harvested snapshot is one large module; keep it as its own chunk.
    chunkSizeWarningLimit: 30000,
  },
});
