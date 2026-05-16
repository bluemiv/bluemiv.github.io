import { getPageNumber, getPosts } from '@/features/post/api';
import { LIMIT } from '@/shared/constants/pagination';
import { SITE_METADATA } from '@/shared/constants/site';
import { BlogHomeLayout } from '../../../widgets/layouts';

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { page } = await params;
  const baseUrl = process.env.BASE_URL ?? SITE_METADATA.baseUrl;
  const title = `블로그 글 목록 (${page}페이지) | ${SITE_METADATA.title}`;
  const description = `${SITE_METADATA.title}의 기술 글 목록 ${page}페이지입니다.`;

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/${page}` },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${page}`,
      siteName: SITE_METADATA.title,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
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
