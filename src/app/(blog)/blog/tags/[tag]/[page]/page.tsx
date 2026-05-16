import { getPageNumberByTag, getPostsByTag, getTags } from '@/features/post/api';
import { LIMIT } from '@/shared/constants/pagination';
import { SITE_METADATA } from '@/shared/constants/site';
import { MIN_INDEXABLE_TAG_POST_COUNT } from '@/shared/constants/structuredData';
import { BlogHomeLayout } from '../../../../../../widgets/layouts';

interface Props {
  params: Promise<{ tag: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { tag, page } = await params;
  const baseUrl = process.env.BASE_URL ?? SITE_METADATA.baseUrl;
  const decodedTag = decodeURIComponent(tag);
  const url = `${baseUrl}/blog/tags/${tag}/${page}`;
  const tagCount = getTags().find(([currentTag]) => currentTag === decodedTag)?.[1] ?? 0;
  const title = `#${decodedTag} 글 목록${page === '1' ? '' : ` (${page}페이지)`} | ${SITE_METADATA.title}`;
  const description = `${SITE_METADATA.title}에서 #${decodedTag} 태그가 달린 기술 글을 모아봅니다.`;
  const shouldNoIndex = page !== '1' || tagCount < MIN_INDEXABLE_TAG_POST_COUNT;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: shouldNoIndex
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
