import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@tanstack/react-start": path.resolve(__dirname, "src/apk/server-fn-stub.ts"),
    },
  },
  define: {
    "process.env.XAI_API_KEY": "undefined",
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "android/app/src/main/assets/www",
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 200000,
    lib: {
      entry: path.resolve(__dirname, "src/apk/main.tsx"),
      name: "TalentOS",
      formats: ["iife"],
      fileName: () => "app.js",
    },
    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true,
        assetFileNames: "app.[ext]",
      },
    },
  },
});
