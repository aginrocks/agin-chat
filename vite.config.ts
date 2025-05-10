import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
// @ts-expect-error process is a nodejs global
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss()
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      // @ts-expect-error process is a nodejs global
      "@": path.resolve(__dirname, "./src"),
      // @ts-expect-error process is a nodejs global
      "@lib": path.resolve(__dirname, "./src/lib"),
      // @ts-expect-error process is a nodejs global
      "@components": path.resolve(__dirname, "./src/components"),
      
      // @ts-expect-error process is a nodejs global
      '/node_modules/.vite/deps/pkg/matrix_sdk_crypto_wasm_bg.wasm': path.resolve(__dirname, './public/matrix_sdk_crypto_wasm_bg.wasm'),
    },
  },
}));
