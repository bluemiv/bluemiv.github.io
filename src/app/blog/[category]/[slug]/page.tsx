import Image from 'next/image';
import dayjs from 'dayjs';
import { getAllPosts, getPost } from '@/entities/post/api';
import { PostMdxContent, TableOfContent } from '@/entities/post/ui';

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
          <article className="max-w-[940px] w-full min-w-0">
            <div className="flex flex-col gap-md pb-2xl mb-lg">
              {post.metadata.thumbnail && (
                <div className="overflow-hidden rounded-lg w-full max-h-[280px] h-full bg-app-sub-bg">
                  <Image
                    className="w-full h-full object-cover duration-150 ease-in-out hover:scale-110"
                    width={720}
                    height={280}
                    src={post.metadata.thumbnail}
                    alt={post.metadata.title}
                  />
                </div>
              )}
              <h1 className="font-semibold text-4xl mb-md">{post.metadata.title}</h1>
              <div className="flex flex-col gap-xs text-sm text-app-sub-text dark:text-app-dark-sub-text">
                <div>{post.metadata.author}</div>
                <div className="flex gap-md">
                  {post.metadata.updatedAt &&
                    !dayjs(post.metadata.createdAt).isSame(
                      dayjs(post.metadata.updatedAt),
                      'minutes',
                    ) && (
                      <div>
                        최종 수정일: {dayjs(post.metadata.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                    )}
                  <div>작성일: {dayjs(post.metadata.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
                </div>
              </div>
            </div>
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
