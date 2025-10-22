import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    // Force the Turbopack workspace root to this project to avoid Unicode path panics.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
