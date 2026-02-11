import Link from 'next/link';
import { Tag } from '@/features/tag/components';
import { ROUTE_PATH } from '@/shared/constants/route';

interface Props {
  tag: string;
  count?: number;
}

export const TagLink = ({ tag, count }: Props) => {
  return (
    <Link
      className="duration-150 ease-in-out hover:shadow-md rounded-full"
      href={[ROUTE_PATH.BLOG_TAGS, encodeURIComponent(tag.toLowerCase()), '1'].join('/')}
    >
      <Tag tag={tag} count={count} />
    </Link>
  );
};
