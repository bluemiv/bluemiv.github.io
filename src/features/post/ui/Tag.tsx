import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';

interface Props {
  tag: string;
}

export default function Tag({ tag }: Props) {
  return (
    <Link
      className="text-sm bg-app-sub-bg dark:bg-app-dark-sub-bg px-sm py-xs rounded-full duration-150 ease-in-out hover:shadow-md"
      href={[ROUTE_PATH.BLOG_TAGS, tag].join('/')}
    >
      #{tag}
    </Link>
  );
}
