import { getAllShortPosts, getShortPost } from '@/features/post/api';
import { getPublisherStructuredData } from '@/shared/constants/structuredData';
import { ShortPostsLayout } from '@/widgets/layouts';

interface Props {
  params: Promise<{ slug: string }>;
}

const toISOString = (date: string | Date) => new Date(date).toISOString();

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getShortPost(slug);
  const baseUrl = process.env.BASE_URL!;
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
      images: post.metadata.thumbnail ? [{ url: `${baseUrl}${post.metadata.thumbnail}` }] : [],
      publishedTime,
      modifiedTime,
      authors: [post.metadata.author],
      tags: post.metadata.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.description,
      images: post.metadata.thumbnail ? [`${baseUrl}${post.metadata.thumbnail}`] : [],
    },
  };
}

export default async function ShortPostsPage({ params }: Props) {
  const { slug } = await params;
  const post = getShortPost(slug);
  const baseUrl = process.env.BASE_URL!;
  const publishedTime = toISOString(post.metadata.createdAt);
  const modifiedTime = toISOString(post.metadata.updatedAt);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: { '@type': 'Person', name: post.metadata.author },
    url: `${baseUrl}/blog/short/${slug}`,
    ...(post.metadata.thumbnail && { image: `${baseUrl}${post.metadata.thumbnail}` }),
    keywords: post.metadata.tags.join(', '),
    publisher: getPublisherStructuredData(baseUrl),
  };

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
