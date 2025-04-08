import { getAllPosts, getPageNumber } from '@/entities/post/api';
import { BlogHomeLayout } from '@/shared/layouts';

export default function Home() {
  const posts = getAllPosts();

  return <BlogHomeLayout posts={posts} currentPageNum={1} totalPageNum={getPageNumber()} />;
}
