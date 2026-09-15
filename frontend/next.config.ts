import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/activities/calendar/:path*",
        destination: "/activities/calender/:path*",
        permanent: true,
      },
      {
        source: "/publications/research/:path*",
        destination: "/publications/researchs/:path*",
        permanent: true,
      },
      {
        source: "/publications/magazine/:path*",
        destination: "/publications/megazines/:path*",
        permanent: true,
      },
      {
        source: "/publications/toolkit/:path*",
        destination: "/publications/toolkits/:path*",
        permanent: true,
      },
      {
        source: "/publications/learning-resources/:path*",
        destination: "/publications/learningResources/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
