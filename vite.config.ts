import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: false,
    outDir: "../dist",
  },
  resolve: {
    dedupe: ["prosemirror-model", "prosemirror-state"],
  },
  root: "src",
});
