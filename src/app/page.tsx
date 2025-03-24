import { getAllPosts } from '@/entities/post/api';
import { GridPostCard } from '@/entities/post/ui';

export default function Home() {
  const posts = getAllPosts();
  
  return (
    <div className=" p-md">
      <div className="mx-auto w-full max-w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
        {posts.map((post) => (
          <GridPostCard key={[post.metadata.category, post.metadata.slug].join('/')} post={post} />
        ))}
      </div>
    </div>
  );
}
