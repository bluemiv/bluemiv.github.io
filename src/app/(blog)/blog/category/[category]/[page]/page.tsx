import { getCategories, getPageNumberByCategory, getPostsByCategory } from '@/entities/post/api';
import { LIMIT } from '@/shared/constants/pagination';
import { BlogHomeLayout } from '../../../../../../widgets/layouts';

interface Props {
  params: Promise<{ category: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const common = {
    title: `'${decodeURIComponent(category)}'에 대한 글`,
    description: `'${decodeURIComponent(category)}'에 대한 글 목록입니다.`,
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
