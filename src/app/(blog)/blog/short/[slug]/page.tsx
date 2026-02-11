import { getAllShortPosts, getShortPost } from '@/features/post/api';
import { ShortPostsLayout } from '../../../../../widgets/layouts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getShortPost(slug);
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

export default async function ShortPostsPage({ params }: Props) {
  const { slug } = await params;
  return <ShortPostsLayout slug={slug} />;
}

export async function generateStaticParams() {
  return getAllShortPosts().map((post) => ({ slug: post.metadata.slug }));
}

export const dynamic = 'force-static';
