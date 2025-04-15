import { getCategories, getPageNumberByCategory, getPostsByCategory } from '@/entities/post/api';
import { BlogHomeLayout } from '@/shared/layouts';
import { LIMIT } from '@/shared/constants/pagination';

interface Props {
  params: Promise<{ category: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const common = {
    title: `'${category}'에 대한 글`,
    description: `'${category}'에 대한 글 목록입니다.`,
  };
  return {
    ...common,
    openGraph: {
      ...common,
    },
  };
}

export default async function Page(props: Props) {
  const { category, page } = await props.params;
  const pageNum = Number(page);
  const posts = getPostsByCategory(category, { offset: (pageNum - 1) * LIMIT, limit: LIMIT });

  return (
    <BlogHomeLayout
      mainAreaTitle={`'${category.slice(0, 1).toUpperCase()}${category.slice(1, category.length).toLowerCase()}'에 대한 글 (${page} 페이지)`}
      posts={posts}
      currentPageNum={pageNum}
      totalPageNum={getPageNumberByCategory(category)}
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
        category: encodeURIComponent(category),
        page: page.toString(),
      })),
    ];
  }, []);
}

export const dynamic = 'force-static';
