import { getAllShortPosts, getShortPost } from '@/features/post/api';
import { SITE_METADATA } from '@/shared/constants/site';
import {
  getBlogPostingStructuredData,
  getBreadcrumbStructuredData,
  getSocialImages,
  toISOString,
} from '@/shared/constants/structuredData';
import { ShortPostsLayout } from '@/widgets/layouts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getShortPost(slug);
  const baseUrl = process.env.BASE_URL ?? SITE_METADATA.baseUrl;
  const url = `${baseUrl}/blog/short/${slug}`;
  const publishedTime = toISOString(post.metadata.createdAt);
  const modifiedTime = toISOString(post.metadata.updatedAt);

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.metadata.title,
      description: post.metadata.description,
      url,
      siteName: SITE_METADATA.title,
      locale: 'ko_KR',
      images: getSocialImages({
        alt: post.metadata.title,
        baseUrl,
        thumbnail: post.metadata.thumbnail,
      }),
      publishedTime,
      modifiedTime,
      authors: [post.metadata.author],
      section: 'short',
      tags: post.metadata.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.description,
      images: getSocialImages({
        alt: post.metadata.title,
        baseUrl,
        thumbnail: post.metadata.thumbnail,
      }),
    },
  };
}

export default async function ShortPostsPage({ params }: Props) {
  const { slug } = await params;
  const post = getShortPost(slug);
  const baseUrl = process.env.BASE_URL ?? SITE_METADATA.baseUrl;
  const publishedTime = toISOString(post.metadata.createdAt);
  const modifiedTime = toISOString(post.metadata.updatedAt);
  const url = `${baseUrl}/blog/short/${slug}`;

  const jsonLd = [
    getBlogPostingStructuredData({
      author: post.metadata.author,
      baseUrl,
      description: post.metadata.description,
      modifiedTime,
      publishedTime,
      tags: post.metadata.tags,
      thumbnail: post.metadata.thumbnail,
      title: post.metadata.title,
      url,
    }),
    getBreadcrumbStructuredData(baseUrl, [
      { name: 'Home', path: '/' },
      { name: post.metadata.title, path: `/blog/short/${slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShortPostsLayout slug={slug} />
    </>
  );
}

export async function generateStaticParams() {
  return getAllShortPosts().map((post) => ({ slug: post.metadata.slug }));
}

export const dynamic = 'force-static';
