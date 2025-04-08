import type { MetadataRoute } from 'next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getAllPosts } from '@/entities/post/api';

dayjs.extend(utc);
dayjs.extend(timezone);

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL || 'https://bluemiv.github.io';
  const posts = getAllPosts();
  const postsSitemapData = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.metadata.category}/${post.metadata.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ssZ'),
    changeFrequency: 'weekly' as ChangeFrequency,
    images: [`${baseUrl}/r/i/${post.metadata.category}/${post.metadata.slug}/thumbnail.webp`],
    priority: 1,
  }));
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postsSitemapData,
  ];
}

export const dynamic = 'force-static';
