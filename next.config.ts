import type { NextConfig } from 'next';
import dayjs from 'dayjs';

const buildTime = dayjs().toISOString().replace(/[:.]/g, '-');

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: ['next-mdx-remote'],
  env: {
    NEXT_PUBLIC_BUILD_TIME: buildTime,
  },
};

export default nextConfig;
