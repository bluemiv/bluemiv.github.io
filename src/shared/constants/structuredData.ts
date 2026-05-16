import { SITE_METADATA } from './site';

export const getPublisherStructuredData = (baseUrl: string) => ({
  '@type': 'Organization',
  name: SITE_METADATA.title,
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/r/i/profile.webp`,
  },
});
