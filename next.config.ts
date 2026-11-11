import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.48.168"],
  images: {
    unoptimized: true
  },
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
