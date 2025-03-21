import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // transpilePackages: ['next-mdx-remote'],
  // images: {
  //   remotePatterns: [{ protocol: 'https', hostname: 'bluemiv.github.io' }],
  // },
};

export default nextConfig;
