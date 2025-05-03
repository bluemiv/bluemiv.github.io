import { getPageNumber, getPosts } from '@/entities/post/api';
import { LIMIT } from '@/shared/constants/pagination';
import { BlogHomeLayout } from '../../widgets/layouts';

interface Props {
  params: Promise<{ page: string }>;
}

export default async function Page({ params }: Props) {
  const { page } = await params;
  const pageNum = Number(page);
  const posts = getPosts({ offset: (pageNum - 1) * LIMIT, limit: LIMIT });
  return <BlogHomeLayout posts={posts} currentPageNum={pageNum} totalPageNum={getPageNumber()} />;
}

export async function generateStaticParams() {
  const totalPageNum = getPageNumber();
  return Array.from({ length: totalPageNum }, (_, idx) => idx + 1).map((page) => ({
    page: page.toString(),
  }));
}

export const dynamic = 'force-static';
