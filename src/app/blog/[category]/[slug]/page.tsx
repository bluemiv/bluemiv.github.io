import { getAllPosts, getPost } from '@/entities/post/api';
import { ArticleMetadata, PostMdxContent, TableOfContent } from '@/entities/post/ui';
import { Sidebar } from '@/widgets/Sidebar';
import { ResponsiveAd } from '@/shared/ui';

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

  return (
    <div className="flex items-start justify-start">
      <Sidebar />
      <div className="relative flex-1 px-md">
        <main className="mx-auto max-w-[1000px] w-full flex items-start justify-start gap-lg">
          <div className="animate-fade-in max-w-[1000px] lg:max-w-[750px] w-full min-w-0 py-md">
            <ArticleMetadata post={post} />
            <article>
              <PostMdxContent content={post.content} />
            </article>
          </div>
          <TableOfContent />
        </main>
        <div className="w-full">
          <ResponsiveAd />
        </div>
      </div>
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
