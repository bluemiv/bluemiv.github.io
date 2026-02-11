import { getAllPosts, getNextAndPrevPost, getPost } from '@/features/post/api';
import {
  ArticleMetadata,
  Comments,
  NextOrPrevPostCard,
  PostMdxContent,
  TableOfContent,
} from '@/features/post/components';
import { ResponsiveAd } from '@/shared/components';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  const common = {
    title: post.metadata.title,
    description: post.metadata.description,
  };
  return {
    ...common,
    openGraph: {
      ...common,
      images: post.metadata.thumbnail ? [{ url: post.metadata.thumbnail }] : [],
    },
  };
}

export default async function Page(props: Props) {
  const { category, slug } = await props.params;
  const post = getPost(category, slug);
  const { nextPost, prevPost } = getNextAndPrevPost(category, slug);

  return (
    <div className="flex items-start justify-start">
      <Sidebar />
      <main className="relative w-full px-md md:max-w-[calc(100%-280px)]">
        <div className="mx-auto max-w-[1000px] w-full flex items-start justify-start gap-lg">
          <div className="animate-fade-in max-w-[1000px] lg:max-w-[770px] w-full min-w-0 py-md">
            <ArticleMetadata post={post} />
            <ResponsiveAd />
            <article>
              <PostMdxContent content={post.content} />
            </article>
            <ResponsiveAd />
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
