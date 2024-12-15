// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
