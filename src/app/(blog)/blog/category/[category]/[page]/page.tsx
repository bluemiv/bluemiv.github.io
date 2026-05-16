import { getCategories, getPageNumberByCategory, getPostsByCategory } from '@/features/post/api';
import { LIMIT } from '@/shared/constants/pagination';
import { SITE_METADATA } from '@/shared/constants/site';
import { BlogHomeLayout } from '../../../../../../widgets/layouts';

interface Props {
  params: Promise<{ category: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category, page } = await params;
  const baseUrl = process.env.BASE_URL ?? SITE_METADATA.baseUrl;
  const decodedCategory = decodeURIComponent(category);
  const url = `${baseUrl}/blog/category/${category}/${page}`;
  const title = `${decodedCategory} 글 목록${page === '1' ? '' : ` (${page}페이지)`} | ${SITE_METADATA.title}`;
  const description = `${SITE_METADATA.title}의 ${decodedCategory} 카테고리 글 목록입니다. 관련 기술 글과 문제 해결 기록을 모아볼 수 있습니다.`;
  const isPaginatedPage = page !== '1';

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: isPaginatedPage
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
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

export default async function Page(props: Props) {
  const { category, page } = await props.params;
  const cate = decodeURIComponent(category);
  const pageNum = Number(page);
  const posts = getPostsByCategory(cate, { offset: (pageNum - 1) * LIMIT, limit: LIMIT });

  return (
    <BlogHomeLayout
      mainAreaTitle={`'${cate.slice(0, 1).toUpperCase()}${cate.slice(1, cate.length).toLowerCase()}'에 대한 글 (${page} 페이지)`}
      posts={posts}
      currentPageNum={pageNum}
      totalPageNum={getPageNumberByCategory(cate)}
    />
  );
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.reduce((acc: { category: string; page: string }[], entry) => {
    const category = entry[0];
    const totalPageNum = getPageNumberByCategory(category);
    return [
      ...acc,
      ...Array.from({ length: totalPageNum }, (_, idx) => idx + 1).map((page) => ({
        category: category.toLowerCase(),
        page: page.toString(),
      })),
    ];
  }, []);
}

export const dynamic = 'force-static';
