import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Post } from '@/entities/post/model';
import { GridPostCard } from '@/entities/post/ui';
import { ResponsiveAd } from '@/shared/ui';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  mainAreaTitle?: ReactNode;
  posts: Post[];
  currentPageNum: number;
  totalPageNum: number;
}

export default function BlogHomeLayout({
  mainAreaTitle,
  posts,
  currentPageNum,
  totalPageNum,
}: Props) {
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
          <div className="w-full flex items-center justify-center gap-sm">
            {Array.from({ length: totalPageNum }, (_, idx) => idx + 1).map((page) => (
              <div
                key={page}
                className={clsx(
                  ' w-[32px] h-[32px] flex items-center justify-center rounded-md',
                  page === currentPageNum
                    ? 'bg-app-primary dark:bg-app-dark-primary text-white cursor-not-allowed'
                    : 'bg-app-sub-bg dark:bg-app-dark-sub-bg hover:bg-app-primary dark:hover:bg-app-dark-primary hover:text-white duration-100 ease-in-out cursor-pointer',
                )}
              >
                {page === currentPageNum ? (
                  <span>{page}</span>
                ) : (
                  <Link
                    className="w-full h-full flex items-center justify-center"
                    href={`/${page}`}
                  >
                    {page}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
