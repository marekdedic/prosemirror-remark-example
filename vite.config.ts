import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: false,
  },
  resolve: {
    dedupe: ["prosemirror-model", "prosemirror-state"],
  },
});
