import { SITE_METADATA } from './site';

export const SOCIAL_IMAGE_SIZE = {
  width: 1080,
  height: 589,
} as const;

export const MIN_INDEXABLE_TAG_POST_COUNT = 2;

export const toISOString = (date: string | Date) => new Date(date).toISOString();

export const getAbsoluteUrl = (baseUrl: string, path: string) =>
  path.startsWith('http') ? path : `${baseUrl}${path}`;

export const getSocialImages = ({
  alt,
  baseUrl,
  thumbnail,
}: {
  alt: string;
  baseUrl: string;
  thumbnail?: string;
}) =>
  thumbnail
    ? [
        {
          url: getAbsoluteUrl(baseUrl, thumbnail),
          width: SOCIAL_IMAGE_SIZE.width,
          height: SOCIAL_IMAGE_SIZE.height,
          alt,
        },
      ]
    : [];

export const getPublisherStructuredData = (baseUrl: string) => ({
  '@type': 'Organization',
  name: SITE_METADATA.title,
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/r/i/profile.webp`,
  },
});

export const getBlogPostingStructuredData = ({
  author,
  baseUrl,
  description,
  modifiedTime,
  publishedTime,
  tags,
  thumbnail,
  title,
  url,
}: {
  author: string;
  baseUrl: string;
  description: string;
  modifiedTime: string;
  publishedTime: string;
  tags: string[];
  thumbnail?: string;
  title: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  datePublished: publishedTime,
  dateModified: modifiedTime,
  author: {
    '@type': 'Person',
    name: author,
    url: `${baseUrl}/about`,
  },
  publisher: getPublisherStructuredData(baseUrl),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url,
  },
  url,
  ...(thumbnail && { image: getAbsoluteUrl(baseUrl, thumbnail) }),
  keywords: tags.join(', '),
});

export const getBreadcrumbStructuredData = (
  baseUrl: string,
  items: { name: string; path: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: getAbsoluteUrl(baseUrl, item.path),
  })),
});
