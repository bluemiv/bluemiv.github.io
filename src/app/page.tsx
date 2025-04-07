import { getAllPosts } from '@/entities/post/api';
import { GridPostCard } from '@/entities/post/ui';
import { Sidebar } from '@/widgets/Sidebar';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="flex items-start justify-start gap-md">
        <Sidebar />
        <div className="flex-1">
          <main className="max-w-[1280px] p-md mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
            {posts.map((post) => (
              <GridPostCard
                key={[post.metadata.category, post.metadata.slug].join('/')}
                post={post}
              />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
