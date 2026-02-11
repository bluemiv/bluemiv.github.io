import { getTags } from '@/features/post/api';
import { TagLink } from '@/features/tag/components';
import SectionTitle from '@/widgets/Sidebar/SectionTitle';

export const TagSection = () => {
  const tags = getTags();
  return (
    <section>
      <SectionTitle>Tags</SectionTitle>
      <ul className="flex gap-sm flex-wrap">
        {tags.map((entry) => {
          const tag = entry[0];
          const count = entry[1];
          return <TagLink key={tag} tag={tag} count={count} />;
        })}
      </ul>
    </section>
  );
};
