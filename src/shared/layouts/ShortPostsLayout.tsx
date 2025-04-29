import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import {
  getShortPageNumber,
  getShortPost,
  getShortPostCurrentPageNumber,
  getShortPosts,
} from '@/entities/post/api';
import { Pagination, PostMdxContent } from '@/entities/post/ui';
import { ShortTagLink } from '@/features/tag/ui';
import { ROUTE_PATH } from '@/shared/constants/route';
import { ResponsiveAd } from '@/shared/ui';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  slug: string;
}

export const ShortPostsLayout = ({ slug }: Props) => {
  const post = getShortPost(slug);
  const posts = getShortPosts(slug);
  const totalPageNum = getShortPageNumber();
  const currentPageNum = getShortPostCurrentPageNumber(slug);

  return (
    <div className="flex items-start justify-start w-full">
      <Sidebar />
      <div className="w-full md:w-[calc(100%-280px)]">
        <main className="max-w-[1280px] mx-auto w-full flex flex-col gap-lg justify-start items-start">
          <div className="w-full flex">
            <div className="p-md w-full sm:w-[calc(100%-240px)] md:w-full lg:w-[calc(100%-380px)] xl:w-[calc(100%-500px)]">
              <div className="relative rounded-lg overflow-hidden h-[280px] group">
                {post.metadata.thumbnail && (
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                      className="w-full h-full object-cover group-hover:scale-120 duration-150 ease-in-out"
                      width={800}
                      height={280}
                      src={post.metadata.thumbnail}
                      alt={post.metadata.title}
                    />
                  </div>
                )}
                <div className="absolute top-0 left-0 flex flex-col items-center justify-center gap-sm bg-white/80 dark:bg-black/70 text-center w-full h-full group-hover:backdrop-blur-sm">
                  <div className="text-app-text dark:text-app-dark-text font-semibold line-clamp-2 text-2xl">
                    {post.metadata.title}
                  </div>
                  <div className="text-sm">{post.metadata.author}</div>
                  <div className="text-sm flex items-center gap-md">
                    {post.metadata.updatedAt &&
                      !dayjs(post.metadata.createdAt).isSame(
                        dayjs(post.metadata.updatedAt),
                        'minutes',
                      ) && (
                        <div>
                          최종 수정일:{' '}
                          {dayjs(post.metadata.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                      )}
                    <div>
                      작성일: {dayjs(post.metadata.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                  </div>
                </div>
              </div>
              <article>
                <PostMdxContent content={post.content} />
              </article>
              <div className="flex flex-wrap gap-md">
                {post.metadata.tags.map((tag) => (
                  <ShortTagLink key={tag} tag={tag} />
                ))}
              </div>
            </div>
            <div className="hidden sm:block sm:min-w-[240px] md:hidden lg:block lg:min-w-[380px] xl:min-w-[500px]">
              <div className="py-md sticky top-[50px] flex flex-col gap-md">
                <div>
                  {posts.map((post) => {
                    const active = post.metadata.slug === slug;
                    return (
                      <div
                        key={post.metadata.slug}
                        className={clsx(
                          'w-full border-b border-app-sub-bg dark:border-app-dark-sub-bg p-sm border-l-3 flex flex-col gap-sm',
                          active
                            ? 'border-l-app-primary dark:border-l-app-dark-primary'
                            : 'border-l-transparent dark:border-l-transparent',
                        )}
                      >
                        {active ? (
                          <div className="font-semibold line-clamp-1 cursor-not-allowed text-app-primary dark:text-app-dark-primary">
                            {post.metadata.title}
                          </div>
                        ) : (
                          <Link
                            href={[ROUTE_PATH.BLOG_SHORT, post.metadata.slug].join('/')}
                            className="font-semibold line-clamp-1 cursor-pointer hover:text-app-primary dark:hover:text-app-dark-primary"
                          >
                            {post.metadata.title}
                          </Link>
                        )}
                        <div className="text-sm text-app-sub-text dark:text-app-dark-sub-text line-clamp-1">
                          {post.metadata.description}
                        </div>
                        <div className="w-full flex items-center justify-between gap-sm">
                          <div className="flex items-center flex-wrap gap-xs">
                            {post.metadata.tags.slice(0, 4).map((tag) => (
                              <ShortTagLink key={tag} tag={tag} />
                            ))}
                          </div>
                          <div className="text-xs text-app-sub-text dark:text-app-dark-sub-text">
                            {dayjs(post.metadata.createdAt).format('YYYY-MM-DD')}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Pagination
                  prefix={ROUTE_PATH.BLOG_SHORT}
                  currentPageNum={currentPageNum}
                  totalPageNum={totalPageNum}
                />
                <div className="overflow-hidden w-full">
                  <ResponsiveAd />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
