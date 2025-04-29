import dayjs from 'dayjs';
import Image from 'next/image';
import { getShortPost } from '@/entities/post/api';
import { PostMdxContent } from '@/entities/post/ui';
import { ShortTagLink } from '@/features/tag/ui';
import { ShortPostGroup } from '@/widgets/ShortPostGroup';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  slug: string;
}

export const ShortPostsLayout = ({ slug }: Props) => {
  const post = getShortPost(slug);
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
              <ShortPostGroup slug={slug} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
