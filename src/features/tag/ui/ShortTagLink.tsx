import { Tag } from '@/entities/tag/ui';

interface Props {
  tag: string;
}

export const ShortTagLink = ({ tag }: Props) => {
  return <Tag tag={tag} />;
};
