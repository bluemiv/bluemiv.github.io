import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { MetadataRoute } from 'next';
import { LOTTOCAT645_APP } from '@/features/apps/lottocat645';
import { POTION_SORT_QUEST_APP } from '@/features/apps/potion-sort-quest';
import {
  getAllPosts,
  getAllShortPosts,
  getCategories,
  getPageNumberByCategory,
  getPageNumberByTag,
  getTags,
} from '@/features/post/api';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';
import { MIN_INDEXABLE_TAG_POST_COUNT } from '@/shared/constants/structuredData';

dayjs.extend(utc);
dayjs.extend(timezone);

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL ?? SITE_METADATA.baseUrl;
  const appPagesSitemapData = [
    {
      url: `${baseUrl}${ROUTE_PATH.APPS}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}${ROUTE_PATH.APPS_LOTTOCAT645}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      images: [`${baseUrl}${LOTTOCAT645_APP.icon}`],
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTE_PATH.APPS_LOTTOCAT645_PRIVACY}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as ChangeFrequency,
      priority: 0.3,
    },
    {
      url: `${baseUrl}${ROUTE_PATH.APPS_POTION_SORT_QUEST_PRIVACY}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as ChangeFrequency,
      images: [`${baseUrl}${POTION_SORT_QUEST_APP.icon}`],
      priority: 0.3,
    },
  ];

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
  const tags = getTags().filter(([, count]) => count >= MIN_INDEXABLE_TAG_POST_COUNT);
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
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postsSitemapData,
    ...shortPostsSitemapData,
    ...appPagesSitemapData,
    ...categoriesSitemapData,
    ...tagsSitemapData,
  ];
}

export const dynamic = 'force-static';
