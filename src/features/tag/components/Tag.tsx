import { isNil } from 'lodash';
import { TagIcon } from '@/shared/components/Icons';

interface Props {
  tag: string;
  count?: number;
}

export const Tag = ({ tag, count }: Props) => {
  return (
    <span className="text-sm bg-app-sub-bg dark:bg-app-dark-sub-bg px-sm py-xs rounded-md flex items-center gap-xs">
      <TagIcon className="w-[0.8rem] " />
      {tag}
      {!isNil(count) && (
        <span className="text-app-sub-text dark:text-app-dark-sub-text text-xs">{count}</span>
      )}
    </span>
  );
};
