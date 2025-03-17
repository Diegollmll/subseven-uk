import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elasticbeanstalk-us-east-1-867968001024.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'localhost',
      'forku.app',
      'subseven-uk.vercel.app'
    ],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
  experimental: {
    turbo: {}
  },
  // Add this configuration to disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;