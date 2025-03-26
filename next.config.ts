import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    taint: true,
  },
  i18n: {
    locales: ["en", "fr"], 
    defaultLocale: "en", 
  },
};

export default nextConfig;

