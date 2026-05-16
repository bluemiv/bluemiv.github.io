import { Folder } from 'lucide-react';

export const CategoryTag = ({ category }: { category: string }) => {
  return (
    <span className="motion-chip inline-flex items-center gap-[3px] text-app-primary dark:text-app-dark-primary text-xs font-semibold bg-app-primary-soft dark:bg-app-dark-primary-soft px-xs py-[2px] rounded-md">
      <Folder size={12} strokeWidth={2.2} />
      {category}
    </span>
  );
};
