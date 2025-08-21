import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        form: resolve(__dirname, "./form/form.html"),
      },
      output: {
        manualChunks: (id) =>
          id.includes("node_modules") ? "vendor" : undefined,
      },
    },
  },
});
