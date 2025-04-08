import { ReactNode } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { GridPostCard } from '@/entities/post/ui';
import { Post } from '@/entities/post/model';

interface Props {
  mainAreaTitle?: ReactNode;
  posts: Post[];
}

export default function BlogHomeLayout({ mainAreaTitle, posts }: Props) {
  return (
    <div className="flex items-start justify-start gap-md">
      <Sidebar />
      <div className="flex-1">
        <main className="max-w-[1280px] p-md mx-auto w-full">
          {mainAreaTitle && (
            <h1 className="font-semibold text-2xl text-app-sub-text dark:text-app-sub-text mb-lg">
              {mainAreaTitle}
            </h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
            {posts.map((post) => (
              <GridPostCard
                key={[post.metadata.category, post.metadata.slug].join('/')}
                post={post}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
