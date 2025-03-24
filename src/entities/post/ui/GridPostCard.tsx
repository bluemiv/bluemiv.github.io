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
      className="animate-fade-in flex flex-col rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow cursor-pointer"
    >
      <div className="w-full max-h-[180px] h-full bg-slate-100">
        {!!post.metadata.thumbnail && (
          <Image
            className="w-full h-full object-cover"
            width="320"
            height="280"
            src={post.metadata.thumbnail}
            alt={post.metadata.title}
          />
        )}
      </div>
      <div className="flex flex-col gap-md p-md">
        <div className="font-semibold">{post.metadata.title}</div>
        <div className="line-clamp-2 text-slate-600">{post.metadata.description}</div>
      </div>
    </Link>
  );
}
