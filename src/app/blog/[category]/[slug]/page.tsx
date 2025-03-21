interface Props {
  params: Promise<{ category: string; slug: string }>;
}

// export async function generateMetadata({ params }: Props) {
//   const { category, slug } = await params;
//   const post = getPost(category, slug);
//
//   return {
//     title: post?.meta?.title || process.env.NEXT_PUBLIC_APP_TITLE,
//     description: post?.meta?.description || process.env.NEXT_PUBLIC_APP_DESCRIPTION,
//     openGraph: {
//       title: post?.meta?.title || process.env.NEXT_PUBLIC_APP_TITLE,
//       description: post?.meta?.description || process.env.NEXT_PUBLIC_APP_DESCRIPTION,
//       images: post?.meta?.image ? [{ url: post.meta.image }] : [],
//     },
//   };
// }

export default async function Page(props: Props) {
  console.log(props);
  // const { category, slug } = await props.params;
  // const post = getPost(category, slug);
  return (
    <main className="mx-auto max-w-[1100px] w-full flex flex-col-reverse md:flex-row mt-xl">
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

// export async function generateStaticParams() {
//   const posts = getAllPosts();
//   return posts.map((post) => ({
//     category: post.category,
//     slug: post.slug,
//   }));
// }

// export const dynamicParams = false;
