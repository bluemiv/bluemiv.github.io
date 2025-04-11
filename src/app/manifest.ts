import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.METADATA_TITLE,
    short_name: process.env.METADATA_NICNAME,
    description: process.env.METADATA_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
