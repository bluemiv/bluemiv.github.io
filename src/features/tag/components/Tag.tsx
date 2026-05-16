import { isNil } from 'lodash';
import { TagIcon } from '@/shared/components/Icons';

interface Props {
  tag: string;
  count?: number;
}

export const Tag = ({ tag, count }: Props) => {
  return (
    <span className="text-xs font-semibold bg-app-surface-muted dark:bg-app-dark-surface-muted text-app-text-muted dark:text-app-dark-text-muted px-sm py-xs rounded-md flex items-center gap-xs transition-colors hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft hover:text-app-primary dark:hover:text-app-dark-primary">
      <TagIcon className="w-[0.75rem]" />
      {tag}
      {!isNil(count) && (
        <span className="text-app-text-subtle dark:text-app-dark-text-subtle text-xs">
          {count}
        </span>
      )}
    </span>
  );
};
