import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      // Videos dropped into src/assets/photos/ (see src/lib/photos.ts) import as a URL
      "*.mp4": { type: "asset" },
      "*.webm": { type: "asset" },
      "*.mov": { type: "asset" },
    },
  },
};

export default nextConfig;
