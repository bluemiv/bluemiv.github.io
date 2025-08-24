import { getPageNumber, getPosts } from '@/entities/post/api';
import { LIMIT } from '@/shared/constants/pagination';
import { BlogHomeLayout } from '@/widgets/layouts';

export default function Home() {
  const posts = getPosts({ limit: LIMIT, offset: 0 });

  return <BlogHomeLayout posts={posts} currentPageNum={1} totalPageNum={getPageNumber()} />;
}
