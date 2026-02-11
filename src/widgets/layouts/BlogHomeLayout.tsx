import { ReactNode } from 'react';
import { GridPostCard, Pagination } from '@/features/post/components';
import { Post } from '@/features/post/model';
import { ResponsiveAd } from '@/shared/components';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  mainAreaTitle?: ReactNode;
  posts: Post[];
  currentPageNum: number;
  totalPageNum: number;
}

export const BlogHomeLayout = ({ mainAreaTitle, posts, currentPageNum, totalPageNum }: Props) => {
  return (
    <div className="flex items-start justify-start w-full">
      <Sidebar />
      <div className="w-full md:w-[calc(100%-280px)]">
        <main className="max-w-[1280px] p-md mx-auto w-full flex flex-col gap-lg justify-start items-start">
          {mainAreaTitle && (
            <h1 className="font-semibold text-2xl text-app-sub-text dark:text-app-dark-sub-text">
              {mainAreaTitle}
            </h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
            {posts.map((post) => (
              <GridPostCard
                key={[post.metadata.category, post.metadata.slug].join('/')}
                className="first:col-span-1 md:first:col-span-2"
                post={post}
              />
            ))}
          </div>
          <div className="overflow-hidden w-full">
            <ResponsiveAd />
          </div>
          <Pagination prefix="" currentPageNum={currentPageNum} totalPageNum={totalPageNum} />
        </main>
      </div>
    </div>
  );
};
