import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: path.resolve(__dirname, "./dist"), // Output to server/dist/client
  },
  resolve: {
    alias: {
      "@": "/client/src",
    },
  },
});
