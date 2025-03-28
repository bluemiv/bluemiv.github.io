import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import dayjs from 'dayjs';

import { Post } from '@/entities/post/model';

const postsDirectory = path.join(process.cwd(), 'src', '_posts');

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

  return posts.sort(
    (a, b) => dayjs(b.metadata.createdAt).unix() - dayjs(a.metadata.createdAt).unix(),
  );
};

export const getPost = (category: string, slug: string): Post => {
  const filePath = path.join(postsDirectory, category, `${slug}.mdx`);
  return parsePost(filePath, category);
};

/**
 * 최근에 작성된 글을 가져온다.
 * @param count 가져올 글의 개수 (default: 5)
 */
export const getLatestPosts = (count = 5): Post[] => {
  return getAllPosts().slice(0, count);
};
