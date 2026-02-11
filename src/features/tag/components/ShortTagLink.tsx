import { Tag } from '@/features/tag/components';

interface Props {
  tag: string;
}

export const ShortTagLink = ({ tag }: Props) => {
  return <Tag tag={tag} />;
};
