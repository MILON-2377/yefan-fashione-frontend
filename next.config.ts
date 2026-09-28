import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // You can add your FastAPI backend domain here once live (e.g. api.yourdomain.com)
    ],
  },
};
export default nextConfig;
