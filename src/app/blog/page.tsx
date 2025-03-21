import { getAllPosts } from '@/entities/post/api';
import { PostCard } from '@/entities/post/ui';

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="flex flex-col gap-lg">
      {posts.map((post) => (
        <PostCard key={[post.metadata.category, post.metadata.slug].join('/')} post={post} />
      ))}
    </main>
  );
}
