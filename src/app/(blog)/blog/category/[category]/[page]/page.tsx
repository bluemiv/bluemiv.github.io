import { getCategories, getPageNumberByCategory, getPostsByCategory } from '@/features/post/api';
import { LIMIT } from '@/shared/constants/pagination';
import { BlogHomeLayout } from '../../../../../../widgets/layouts';

interface Props {
  params: Promise<{ category: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category, page } = await params;
  const baseUrl = process.env.BASE_URL!;
  const decodedCategory = decodeURIComponent(category);
  const url = `${baseUrl}/blog/category/${category}/${page}`;
  return {
    title: `'${decodedCategory}'에 대한 글`,
    description: `'${decodedCategory}'에 대한 글 목록입니다.`,
    alternates: { canonical: url },
    openGraph: {
      title: `'${decodedCategory}'에 대한 글`,
      description: `'${decodedCategory}'에 대한 글 목록입니다.`,
      url,
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
