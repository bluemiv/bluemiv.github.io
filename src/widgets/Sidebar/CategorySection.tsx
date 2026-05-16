import { getCategories } from '@/features/post/api';
import SectionTitle from '@/widgets/Sidebar/SectionTitle';
import { CategoryItem } from './CategoryItem';

export const CategorySection = () => {
  const categories = getCategories();
  const categoriesMap: Record<string, number> = categories.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );
  return (
    <section className="px-xs">
      <SectionTitle>Category</SectionTitle>
      <ul className="motion-stagger flex flex-col gap-[2px]">
        <CategoryItem
          label="Language"
          category="language"
          count={categoriesMap['language'] ?? 0}
          isNotLink
        />
        <li>
          <ul className="flex flex-col gap-[2px]">
            {[
              { label: 'JavaScript', category: 'javascript' },
              { label: 'Go', category: 'go' },
            ].map(({ label, category }) => (
              <CategoryItem
                isSubList
                key={category}
                label={label}
                category={category}
                count={categoriesMap[category]}
              />
            ))}
          </ul>
        </li>
        <CategoryItem label="Front-end" category="frontend" count={categoriesMap['frontend']} />
        <li>
          <ul className="flex flex-col gap-[2px]">
            {[
              { label: 'React', category: 'react' },
              { label: 'Next.js', category: 'nextjs' },
            ].map(({ label, category }) => (
              <CategoryItem
                isSubList
                key={category}
                label={label}
                category={category}
                count={categoriesMap[category]}
              />
            ))}
          </ul>
        </li>
        <CategoryItem label="Back-end" category="backend" count={categoriesMap['backend']} />
        <li>
          <ul className="flex flex-col gap-[2px]">
            {[
              { label: 'Java', category: 'java' },
              { label: 'Kotlin', category: 'kotlin' },
              { label: 'Spring', category: 'spring' },
            ].map(({ label, category }) => (
              <CategoryItem
                isSubList
                key={category}
                label={label}
                category={category}
                count={categoriesMap[category]}
              />
            ))}
          </ul>
        </li>
        <CategoryItem label="Algorithm" category="algorithm" count={categoriesMap['algorithm']} />
        <CategoryItem label="Firebase" category="firebase" count={categoriesMap['firebase']} />
      </ul>
    </section>
  );
};
