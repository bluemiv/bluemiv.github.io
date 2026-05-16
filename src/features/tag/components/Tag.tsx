import { isNil } from 'lodash';
import { Tag as TagIcon } from 'lucide-react';

interface Props {
  tag: string;
  count?: number;
}

export const Tag = ({ tag, count }: Props) => {
  return (
    <span className="group text-xs font-semibold bg-app-surface-muted/80 dark:bg-app-dark-surface-muted/80 text-app-text-muted dark:text-app-dark-text-muted px-sm py-xs rounded-full flex items-center gap-xs transition-colors hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft hover:text-app-primary dark:hover:text-app-dark-primary">
      <TagIcon
        size={12}
        strokeWidth={2.2}
        className="text-app-text-subtle dark:text-app-dark-text-subtle group-hover:text-app-primary dark:group-hover:text-app-dark-primary"
      />
      <span>{tag}</span>
      {!isNil(count) && (
        <span className="rounded-full bg-app-surface dark:bg-app-dark-surface px-[5px] text-[11px] leading-4 text-app-text-subtle dark:text-app-dark-text-subtle">
          {count}
        </span>
      )}
    </span>
  );
};
