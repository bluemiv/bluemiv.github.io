import { getAllPosts, getPost } from '@/entities/post/api';

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
    <main>
      {/*<article className="max-w-[800px] w-full p-md">*/}
      {/*  <div className="flex flex-col gap-lg mb-3xl">*/}
      {/*    <div className="flex flex-col gap-sm">*/}
      {/*      <Link*/}
      {/*        href={[ROUTE_PATH.BLOG, post.category].join('/')}*/}
      {/*        className="text-primary hover:text-primary-hover active:text-primary-active"*/}
      {/*      >*/}
      {/*        {post.category}*/}
      {/*      </Link>*/}
      {/*      <h1 className="font-bold text-4xl">{post.meta.title}</h1>*/}
      {/*    </div>*/}
      {/*    <div className="rounded-full flex gap-md items-center flex-wrap">*/}
      {/*      {Array.from(new Set(post.meta.tags)).map((tag) => (*/}
      {/*        // TODO Tag 페이지로 이동하도록 해야함*/}
      {/*        <Tag key={tag}>{tag.toLowerCase()}</Tag>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*    <div className="leading-8">*/}
      {/*      <div className="font-semibold">*/}
      {/*        {post.meta.author} · {post.meta.team}*/}
      {/*      </div>*/}
      {/*      <div className="text-sm text-secondary">*/}
      {/*        {dayjs(post.meta.date).format('YYYY년 M월 D일')}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div id="main-content">*/}
      {/*    <MDXComponent content={post.content} />*/}
      {/*  </div>*/}
      {/*</article>*/}
      {/*<div className="w-full md:max-w-[300px] pl-md">*/}
      {/*  <TableOfContent />*/}
      {/*</div>*/}
    </main>
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
