import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
// import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
  // resolve: {
  //   alias: {
  //     // "@/*": "./src/*",
  //     "@/": path.resolve(__dirname, "./src/"),
  //   },
  // },
});
