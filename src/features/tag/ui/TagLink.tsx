import Link from 'next/link';
import { Tag } from '@/entities/tag/ui';
import { ROUTE_PATH } from '@/shared/constants/route';

interface Props {
  tag: string;
}

export const TagLink = ({ tag }: Props) => {
  return (
    <Link href={[ROUTE_PATH.BLOG_TAGS, encodeURIComponent(tag.toLowerCase()), '1'].join('/')}>
      <Tag tag={tag} />
    </Link>
  );
};
