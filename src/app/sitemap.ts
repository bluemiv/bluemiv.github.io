import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { MetadataRoute } from 'next';
import {
  getAllPosts,
  getAllShortPosts,
  getCategories,
  getPageNumberByCategory,
  getPageNumberByTag,
  getTags,
} from '@/entities/post/api';
import { ROUTE_PATH } from '@/shared/constants/route';

dayjs.extend(utc);
dayjs.extend(timezone);

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL;

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
      url: `${baseUrl}${ROUTE_PATH.BLOG}/${post.metadata.category}/${post.metadata.slug}`,
      lastModified: updatedAt.tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ssZ'),
      changeFrequency: 'weekly' as ChangeFrequency,
      images: [`${baseUrl}${post.metadata.thumbnail}`],
      priority,
    };
  });

  // 전체 짧은 글 sitemap
  const shortPosts = getAllShortPosts();
  const shortPostsSitemapData = shortPosts.map((post) => {
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
      url: `${baseUrl}${ROUTE_PATH.BLOG_SHORT}/${post.metadata.slug}`,
      lastModified: updatedAt.tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ssZ'),
      changeFrequency: 'weekly' as ChangeFrequency,
      images: [`${baseUrl}${post.metadata.thumbnail}`],
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
          url: `${baseUrl}/blog/category/${encodeURIComponent(category.toLowerCase())}/${page}`,
          changeFrequency: 'weekly' as ChangeFrequency,
        })),
      ];
    },
    [],
  );

  // Tag sitemap
  const tags = getTags();
  const tagsSitemapData = tags.reduce(
    (
      acc: {
        url: string;
        changeFrequency?: ChangeFrequency;
        priority?: number | undefined;
      }[],
      entry,
    ) => {
      const tag = entry[0];
      const totalPageNum = getPageNumberByTag(tag);
      return [
        ...acc,
        ...Array.from({ length: totalPageNum }, (_, idx) => idx + 1).map((page) => ({
          url: `${baseUrl}/blog/tags/${encodeURIComponent(tag.toLowerCase())}/${page}`,
          changeFrequency: 'weekly' as ChangeFrequency,
        })),
      ];
    },
    [],
  );

  return [
    {
      url: baseUrl!,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postsSitemapData,
    ...shortPostsSitemapData,
    ...categoriesSitemapData,
    ...tagsSitemapData,
  ];
}

export const dynamic = 'force-static';
