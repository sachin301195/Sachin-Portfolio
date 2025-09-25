import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/cv-cancer',
        permanent: true,
      },
    ]
  },
};



export default nextConfig;
