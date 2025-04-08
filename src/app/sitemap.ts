import type { MetadataRoute } from 'next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getAllPosts, getCategories, getPageNumberByCategory } from '@/entities/post/api';

dayjs.extend(utc);
dayjs.extend(timezone);

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL || 'https://bluemiv.github.io';

  // 전체 글 sitemap
  const posts = getAllPosts();
  const postsSitemapData = posts.map((post) => {
    const updatedAt = dayjs(post.metadata.updatedAt);
    const now = dayjs();
    const daysDiff = now.diff(updatedAt, 'day');

    let priority = 0.6;
    if (daysDiff <= 7) {
      priority = 0.9;
    } else if (daysDiff <= 30) {
      priority = 0.8;
    } else if (daysDiff <= 90) {
      priority = 0.7;
    }

    return {
      url: `${baseUrl}/blog/${post.metadata.category}/${post.metadata.slug}`,
      lastModified: updatedAt.tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ssZ'),
      changeFrequency: 'weekly' as ChangeFrequency,
      images: [`${baseUrl}/r/i/${post.metadata.category}/${post.metadata.slug}/thumbnail.webp`],
      priority,
    };
  });

  // Category sitemap
  const categories = getCategories();
  const categoriesSitemapData = categories.reduce(
    (
      acc: {
        url: string;
        changeFrequency?: ChangeFrequency;
        priority?: number | undefined;
      }[],
      entry,
    ) => {
      const category = entry[0];
      const totalPageNum = getPageNumberByCategory(category);
      return [
        ...acc,
        ...Array.from({ length: totalPageNum }, (_, idx) => idx + 1).map((page) => ({
          url: `${baseUrl}/blog/category/${category}/${page}`,
          changeFrequency: 'weekly' as ChangeFrequency,
        })),
      ];
    },
    [],
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postsSitemapData,
    ...categoriesSitemapData,
  ];
}

export const dynamic = 'force-static';
