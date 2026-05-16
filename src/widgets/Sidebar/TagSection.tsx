import { getTags } from '@/features/post/api';
import { TagLink } from '@/features/tag/components';
import SectionTitle from '@/widgets/Sidebar/SectionTitle';

export const TagSection = () => {
  const tags = getTags().slice(0, 20);
  return (
    <section className="rounded-xl border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface p-md">
      <SectionTitle>Tags</SectionTitle>
      <ul className="flex gap-xs flex-wrap">
        {tags.map((entry) => {
          const tag = entry[0];
          const count = entry[1];
          return <TagLink key={tag} tag={tag} count={count} />;
        })}
      </ul>
    </section>
  );
};
