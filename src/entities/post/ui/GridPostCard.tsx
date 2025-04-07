import Image from 'next/image';
import { Post } from '@/entities/post/model';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function GridPostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${[post.metadata.category, post.metadata.slug].join('/')}`}
      className="animate-fade-in flex flex-col rounded-lg overflow-hidden transition-all ease-in-out duration-300 group cursor-pointer border border-app-sub-bg dark:border-app-dark-sub-bg"
    >
      <div className="w-full h-[180px] bg-slate-100 overflow-hidden">
        {!!post.metadata.thumbnail && (
          <Image
            className="w-full h-full object-cover group-hover:scale-110 duration-150 ease-in-out"
            width="320"
            height="280"
            src={post.metadata.thumbnail}
            alt={post.metadata.title}
          />
        )}
      </div>
      <div className="flex flex-col gap-md p-md">
        <div className="font-semibold group-hover:text-app-primary dark:group-hover:text-app-dark-primary">
          {post.metadata.title}
        </div>
        <div className="line-clamp-2 text-app-sub-text dark:text-app-dark-sub-text">
          {post.metadata.description}
        </div>
      </div>
    </Link>
  );
}
