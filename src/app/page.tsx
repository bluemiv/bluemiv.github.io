import { getPageNumber, getPosts } from '@/entities/post/api';
import { BlogHomeLayout } from '@/shared/layouts';
import { LIMIT } from '@/shared/constants/pagination';

export default function Home() {
  const posts = getPosts({ limit: LIMIT, offset: 0 });

  return <BlogHomeLayout posts={posts} currentPageNum={1} totalPageNum={getPageNumber()} />;
}
