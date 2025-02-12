import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@common": path.resolve(__dirname, "./src/commons"),
      "@components": path.resolve(__dirname, "./src/commons/components"),
      "@themes": path.resolve(__dirname, "./src/commons/themes"),
      "@utils": path.resolve(__dirname, "./src/commons/utils"),
      "@types": path.resolve(__dirname, "./src/commons/types"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      
    },
  },
  plugins: [react(),],
  base: "/cv-generator/",
});