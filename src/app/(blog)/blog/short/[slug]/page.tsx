import { getAllShortPosts, getShortPost } from '@/features/post/api';
import { ShortPostsLayout } from '@/widgets/layouts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getShortPost(slug);
  const baseUrl = process.env.BASE_URL!;
  const url = `${baseUrl}/blog/short/${slug}`;
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
      publishedTime: post.metadata.createdAt,
      modifiedTime: post.metadata.updatedAt,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: post.metadata.createdAt,
    dateModified: post.metadata.updatedAt,
    author: { '@type': 'Person', name: post.metadata.author },
    url: `${baseUrl}/blog/short/${slug}`,
    ...(post.metadata.thumbnail && { image: `${baseUrl}${post.metadata.thumbnail}` }),
    keywords: post.metadata.tags.join(', '),
    publisher: {
      '@type': 'Organization',
      name: process.env.METADATA_TITLE,
      url: baseUrl,
    },
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
