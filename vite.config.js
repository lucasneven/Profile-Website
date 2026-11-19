import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative paths so the built site works from any folder or host
  base: "./",
  resolve: {
    // "@/..." means "src/..." (React Bits / shadcn installs rely on this)
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
