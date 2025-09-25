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

  async rewrites() {
    return [
      {
        source: '/api/predict',
        destination: 'https://breast-cancer-classifier-120059375610.northamerica-northeast2.run.app/predict/',
      },
    ]
  },
};



export default nextConfig;
