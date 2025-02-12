import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/common"), 
    },
  },
  plugins: [react(),tsconfigPaths()],
  base: "/cv-generator/",
});