import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@components": path.resolve(__dirname, "./src/common/components"),
      "@theme": path.resolve(__dirname, "./src/common/theme"),
      "@utils": path.resolve(__dirname, "./src/common/utils"),
      "@types": path.resolve(__dirname, "./src/common/types"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      
    },
  },
  plugins: [react(),tsconfigPaths()],
  base: "/cv-generator/",
});