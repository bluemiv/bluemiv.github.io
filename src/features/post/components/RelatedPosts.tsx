import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/features/post/model';
import { ROUTE_PATH } from '@/shared/constants/route';

interface Props {
  posts: Post[];
}

export const RelatedPosts = ({ posts }: Props) => {
  if (posts.length === 0) return null;

  return (
    <section className="my-lg">
      <h2 className="text-lg font-semibold text-app-text dark:text-app-dark-text mb-md">관련 글</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        {posts.map((post) => (
          <Link
            key={`${post.metadata.category}-${post.metadata.slug}`}
            href={[ROUTE_PATH.BLOG, post.metadata.category, post.metadata.slug].join('/')}
            className="flex gap-md rounded-lg border border-app-sub-bg dark:border-app-dark-sub-bg overflow-hidden group hover:border-app-primary/30 dark:hover:border-app-dark-primary/30 duration-150 ease-in-out"
          >
            {post.metadata.thumbnail && (
              <div className="shrink-0 w-[80px] h-[80px] bg-app-sub-bg dark:bg-app-dark-sub-bg overflow-hidden">
                <Image
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 duration-150 ease-in-out"
                  width={80}
                  height={80}
                  src={post.metadata.thumbnail}
                  alt={post.metadata.title}
                />
              </div>
            )}
            <div className="flex-1 flex flex-col justify-center gap-xs py-sm pr-sm min-w-0">
              <span className="text-sm font-semibold text-app-text dark:text-app-dark-text line-clamp-2 group-hover:text-app-primary dark:group-hover:text-app-dark-primary">
                {post.metadata.title}
              </span>
              <span className="text-xs text-app-sub-text dark:text-app-dark-sub-text line-clamp-1">
                {post.metadata.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
