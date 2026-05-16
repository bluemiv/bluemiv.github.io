import { getAllPosts, getNextAndPrevPost, getPost, getRelatedPosts } from '@/features/post/api';
import {
  ArticleMetadata,
  Comments,
  NextOrPrevPostCard,
  PostMdxContent,
  ReadingProgressBar,
  RelatedPosts,
  RSSSubscribeBanner,
  ScrollToTopButton,
  TableOfContent,
} from '@/features/post/components';
import { ResponsiveAd } from '@/shared/components';
import { getPublisherStructuredData } from '@/shared/constants/structuredData';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const toISOString = (date: string | Date) => new Date(date).toISOString();

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  const baseUrl = process.env.BASE_URL!;
  const url = `${baseUrl}/blog/${category}/${slug}`;
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

export default async function Page(props: Props) {
  const { category, slug } = await props.params;
  const post = getPost(category, slug);
  const { nextPost, prevPost } = getNextAndPrevPost(category, slug);
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
    url: `${baseUrl}/blog/${category}/${slug}`,
    ...(post.metadata.thumbnail && { image: `${baseUrl}${post.metadata.thumbnail}` }),
    keywords: post.metadata.tags.join(', '),
    publisher: getPublisherStructuredData(baseUrl),
  };

  return (
    <div className="flex items-start justify-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgressBar />
      <Sidebar />
      <main className="relative w-full px-md md:max-w-[calc(100%-280px)]">
        <div className="mx-auto max-w-[1000px] w-full flex items-start justify-start gap-lg">
          <div className="animate-fade-in max-w-[1000px] lg:max-w-[770px] w-full min-w-0 py-lg">
            <ArticleMetadata post={post} />
            <ResponsiveAd />
            <article className="post-body px-1 md:px-0">
              <PostMdxContent content={post.content} />
            </article>
            <ResponsiveAd />
            <RelatedPosts posts={getRelatedPosts(category, slug)} />
            <RSSSubscribeBanner />
            <Comments />
            <div className="flex items-center gap-md mt-lg flex-col md:flex-row">
              <div className="flex-1">
                {prevPost?.metadata?.title && <NextOrPrevPostCard type="prev" post={prevPost} />}
              </div>
              <div className="flex-1">
                {nextPost?.metadata?.title && <NextOrPrevPostCard type="next" post={nextPost} />}
              </div>
            </div>
          </div>
          <TableOfContent />
        </div>
        <ScrollToTopButton />
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.metadata.category,
    slug: post.metadata.slug,
  }));
}

export const dynamic = 'force-static';
