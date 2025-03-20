import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
  // transpilePackages: ['next-mdx-remote'],
  // images: {
  //   remotePatterns: [{ protocol: 'https', hostname: 'bluemiv.github.io' }],
  // },
};

export default nextConfig;
