import { getAllPosts, getPost } from '@/entities/post/api';
import { ArticleMetadata, PostMdxContent, TableOfContent } from '@/entities/post/ui';

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
    <div className="flex items-start justify-start gap-md">
      <aside className="hidden md:inline-block">sidemenu</aside>
      <main className="relative flex-1 px-md">
        <div className="mx-auto max-w-[1200px] w-full flex items-start justify-start gap-md">
          <article className="animate-fade-in max-w-[940px] w-full min-w-0">
            <ArticleMetadata post={post} />
            <PostMdxContent content={post.content} />
          </article>
          <aside className="hidden md:inline-block md:max-w-[260px] w-full sticky top-[50px]">
            <TableOfContent />
          </aside>
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

export const dynamicParams = false;
