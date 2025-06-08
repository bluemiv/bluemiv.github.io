import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { Post, ShortPost } from '@/entities/post/model';
import { LIMIT } from '@/shared/constants/pagination';

const postsDirectory = path.join(process.cwd(), 'src', '_posts');
const shortPostsDirectory = path.join(process.cwd(), 'src', '_short');

const parsePost = (filePath: string, category: string): Post => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const slug = path.basename(filePath).replace(/\.mdx?$/, '');
  return {
    metadata: {
      category,
      slug,
      title: data?.title ?? '',
      description: data?.description ?? '',
      createdAt: data?.createdAt ?? dayjs().utc().format(),
      updatedAt: data?.updatedAt ?? dayjs().utc().format(),
      tags: data?.tags ?? [],
      release: data?.release ?? false,
      author: data?.author ?? '',
      thumbnail: data?.thumbnail,
    },
    content,
  };
};

const parseShortPost = (filePath: string): ShortPost => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const slug = path.basename(filePath).replace(/\.mdx?$/, '');
  return {
    metadata: {
      slug,
      title: data?.title ?? '',
      description: data?.description ?? '',
      createdAt: data?.createdAt ?? dayjs().utc().format(),
      updatedAt: data?.updatedAt ?? dayjs().utc().format(),
      tags: data?.tags ?? [],
      release: data?.release ?? false,
      author: data?.author ?? '',
      thumbnail: data?.thumbnail,
    },
    content,
  };
};

export const getAllPosts = (): Post[] => {
  const categories = fs.readdirSync(postsDirectory);

  const posts = categories.flatMap((category) => {
    const categoryPath = path.join(postsDirectory, category);
    const slugs = fs.readdirSync(categoryPath);
    return slugs.map((fileName) => {
      const filePath = path.join(categoryPath, fileName);
      return parsePost(filePath, category);
    });
  });

  return posts
    .filter((post) => post.metadata.release)
    .sort((a, b) => dayjs(b.metadata.createdAt).unix() - dayjs(a.metadata.createdAt).unix());
};

export const getPost = (category: string, slug: string): Post => {
  const filePath = path.join(postsDirectory, category, `${slug}.mdx`);
  return parsePost(filePath, category);
};

/**
 * Tag 값에 해당하는 posts를 반환
 * @param tag post의 태그
 * @param page
 */
export const getPostsByTag = (tag: string, page?: { limit: number; offset: number }): Post[] => {
  const offset = page?.offset ?? 0;
  const limit = page?.limit ?? LIMIT;
  return getAllPosts()
    .filter((post) => post.metadata.tags.includes(tag))
    .slice(offset, offset + limit);
};

/**
 * 모든 태그를 가져온다.
 */
export const getTags = () => {
  const posts = getAllPosts();
  const tags = posts.reduce((acc: { [key: string]: number }, post) => {
    for (const tag of post.metadata.tags) {
      if (!acc?.[tag]) {
        acc[tag] = 1;
      } else {
        acc[tag] += 1;
      }
    }
    return acc;
  }, {});
  return Object.entries(tags).sort((p, n) => n[1] - p[1]);
};

/**
 * 최근에 작성된 글을 가져온다.
 * @param count 가져올 글의 개수 (default: 5)
 */
export const getLatestPosts = (count = 5): Post[] => {
  return getAllPosts().slice(0, count);
};

/**
 * 모든 카테고리를 가져온다.
 */
export const getCategories = () => {
  const posts = getAllPosts();
  const categoriesInfo = posts.reduce((acc: { [key: string]: number }, post) => {
    if (!acc?.[post.metadata.category]) {
      acc[post.metadata.category] = 1;
    } else {
      acc[post.metadata.category] += 1;
    }
    return acc;
  }, {});
  return Object.entries(categoriesInfo).sort((p, n) => p[0].localeCompare(n[0]));
};

/**
 * Category 값에 해당하는 posts를 반환
 * @param category
 * @param page
 */
export const getPostsByCategory = (
  category: string,
  page?: { limit: number; offset: number },
): Post[] => {
  const offset = page?.offset ?? 0;
  const limit = page?.limit ?? LIMIT;
  return getAllPosts()
    .filter((post) => post.metadata.category === category)
    .slice(offset, offset + limit);
};

/**
 * Category 값에 해당하는 posts의 전체 페이지 수를 반환
 * @param category
 */
export const getPageNumberByCategory = (category: string): number => {
  const posts = getAllPosts().filter((post) => post.metadata.category === category);
  return Math.ceil(posts.length / LIMIT);
};

/**
 * Tag 값에 해당하는 posts의 전체 페이지 수를 반환
 * @param tag
 */
export const getPageNumberByTag = (tag: string): number => {
  const posts = getAllPosts().filter((post) => post.metadata.tags.includes(tag));
  return Math.ceil(posts.length / LIMIT);
};

/**
 * posts를 가져온다.
 * @param page
 */
export const getPosts = (page?: { limit: number; offset: number }): Post[] => {
  const offset = page?.offset ?? 0;
  const limit = page?.limit ?? LIMIT;
  return getAllPosts().slice(offset, offset + limit);
};

/**
 * 전체 posts의 전체 페이지 수를 반환
 */
export const getPageNumber = () => {
  const posts = getAllPosts();
  return Math.ceil(posts.length / LIMIT);
};

/**
 * 다음글과 이전글을 가져온다.
 * @param category
 * @param slug
 */
export const getNextAndPrevPost = (category: string, slug: string) => {
  const posts = getAllPosts();
  const currentPostIndex = getAllPosts().findIndex(
    (post) => post.metadata.category === category && post.metadata.slug === slug,
  );

  const nextPost = currentPostIndex <= 0 ? null : posts[currentPostIndex - 1];
  const prevPost = currentPostIndex >= posts.length - 1 ? null : posts[currentPostIndex + 1];

  return { nextPost, prevPost };
};

/**
 * 짧은 글 목록을 가져온다.
 */
export const getAllShortPosts = (): ShortPost[] => {
  const postFiles = fs.readdirSync(shortPostsDirectory);

  const posts = postFiles.map((file) => {
    const filePath = path.join(shortPostsDirectory, file);
    return parseShortPost(filePath);
  });

  return posts
    .filter((post) => post.metadata.release)
    .sort((a, b) => dayjs(b.metadata.createdAt).unix() - dayjs(a.metadata.createdAt).unix());
};

/**
 * 짧은 글을 조회한다.
 * @param slug
 */
export const getShortPost = (slug: string): ShortPost => {
  const filePath = path.join(shortPostsDirectory, `${slug}.mdx`);
  return parseShortPost(filePath);
};

/**
 * short posts를 가져온다.
 * @param slug
 */
export const getShortPosts = (slug: string): ShortPost[] => {
  const currentPageNum = getShortPostCurrentPageNumber(slug);
  const offset = (currentPageNum - 1) * LIMIT;
  return getAllShortPosts().slice(offset, offset + LIMIT);
};

/**
 * 전체 short posts의 전체 페이지 수를 반환
 */
export const getShortPageNumber = () => {
  const posts = getAllShortPosts();
  return Math.ceil(posts.length / LIMIT);
};

/**
 * 현재 slug에 맞는 current page number를 반환
 * @param slug
 */
export const getShortPostCurrentPageNumber = (slug: string) => {
  const foundIndex = getAllShortPosts().findIndex((post) => post.metadata.slug === slug);
  return Math.floor(foundIndex / LIMIT) + 1;
};

/**
 * tag에 해당하는 짧은 글 목록을 조회한다.
 * @param tag
 */
export const getShortPostsByTag = (tag: string): ShortPost[] => {
  return getAllShortPosts().filter((post) => post.metadata.tags.includes(tag));
};
