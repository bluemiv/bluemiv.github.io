export function GET() {
  const manifest = {
    id: '/',
    name: process.env.METADATA_TITLE,
    short_name: process.env.METADATA_NICNAME,
    description: process.env.METADATA_DESCRIPTION,
    orientation: 'portrait',
    lang: 'ko',
    scope: '/',
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

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  });
}

export const dynamic = 'force-static';
