import { TagIcon } from '@/shared/ui/Icons';

interface Props {
  tag: string;
}

export const Tag = ({ tag }: Props) => {
  return (
    <span className="text-sm bg-app-sub-bg dark:bg-app-dark-sub-bg px-sm py-xs rounded-md flex items-center gap-xs">
      <TagIcon className="w-[0.8rem] " />
      {tag}
    </span>
  );
};
