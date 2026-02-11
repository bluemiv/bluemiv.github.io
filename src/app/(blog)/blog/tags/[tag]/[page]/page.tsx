import { getPageNumberByTag, getPostsByTag, getTags } from '@/features/post/api';
import { LIMIT } from '@/shared/constants/pagination';
import { BlogHomeLayout } from '../../../../../../widgets/layouts';

interface Props {
  params: Promise<{ tag: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { tag, page } = await params;
  const baseUrl = process.env.BASE_URL!;
  const decodedTag = decodeURIComponent(tag);
  const url = `${baseUrl}/blog/tags/${tag}/${page}`;
  return {
    title: `'${decodedTag}'에 대한 글`,
    description: `'${decodedTag}'에 대한 글 목록입니다.`,
    alternates: { canonical: url },
    openGraph: {
      title: `'${decodedTag}'에 대한 글`,
      description: `'${decodedTag}'에 대한 글 목록입니다.`,
      url,
    },
  };
}

export default async function Page(props: Props) {
  const { tag, page } = await props.params;
  const pageNum = Number(page);
  const posts = getPostsByTag(decodeURIComponent(tag), {
    offset: (pageNum - 1) * LIMIT,
    limit: LIMIT,
  });

  return (
    <BlogHomeLayout
      mainAreaTitle={`'#${decodeURIComponent(tag)}'에 대한 글 (${page} 페이지)`}
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
