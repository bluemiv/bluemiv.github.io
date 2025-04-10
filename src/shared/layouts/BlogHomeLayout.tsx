import { ReactNode } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { GridPostCard } from '@/entities/post/ui';
import { Post } from '@/entities/post/model';
import Link from 'next/link';
import clsx from 'clsx';

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
    <div className="flex items-start justify-start gap-md">
      <Sidebar />
      <div className="flex-1">
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
                post={post}
              />
            ))}
          </div>
          <div className="w-full flex items-center justify-center">
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
                  <Link href={`/${page}`}>{page}</Link>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
