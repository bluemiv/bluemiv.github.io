import { getAllPosts } from '@/entities/post/api';
import { BlogHomeLayout } from '@/shared/layouts';

export default function Home() {
  const posts = getAllPosts();

  return <BlogHomeLayout posts={posts} />;
}
