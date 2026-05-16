export const SITE_METADATA = {
  baseUrl: process.env.BASE_URL ?? 'https://bluemiv.github.io',
  title: process.env.METADATA_TITLE ?? 'Bluemiv Tech Blog',
  description: process.env.METADATA_DESCRIPTION ?? '',
  author: process.env.METADATA_AUTHOR ?? 'Taehong Kim',
  authorEmail: process.env.METADATA_EMAIL ?? '',
  nickname: process.env.METADATA_NICNAME ?? 'bluemiv',
} as const;
