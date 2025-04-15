import { getPageNumberByTag, getPostsByTag, getTags } from '@/entities/post/api';
import { BlogHomeLayout } from '@/shared/layouts';
import { LIMIT } from '@/shared/constants/pagination';

interface Props {
  params: Promise<{ tag: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const common = {
    title: `'${tag}'에 대한 글`,
    description: `'${tag}'에 대한 글 목록입니다.`,
  };
  return {
    ...common,
    openGraph: {
      ...common,
    },
  };
}

export default async function Page(props: Props) {
  const { tag, page } = await props.params;
  const pageNum = Number(page);
  const posts = getPostsByTag(tag, { offset: (pageNum - 1) * LIMIT, limit: LIMIT });

  return (
    <BlogHomeLayout
      mainAreaTitle={`'#${tag}'에 대한 글 (${page} 페이지)`}
      posts={posts}
      currentPageNum={pageNum}
      totalPageNum={getPageNumberByTag(tag)}
    />
  );
}

export async function generateStaticParams() {
  const tags = getTags();
  return tags.reduce((acc: { tag: string; page: string }[], entry) => {
    const tag = entry[0];
    const totalPageNum = getPageNumberByTag(tag);
    return [
      ...acc,
      ...Array.from({ length: totalPageNum }, (_, idx) => idx + 1).map((page) => ({
        tag: tag.toLowerCase(),
        page: page.toString(),
      })),
    ];
  }, []);
}

export const dynamic = 'force-static';
