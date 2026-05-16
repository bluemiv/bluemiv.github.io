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
    <section className="rounded-xl border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface p-md">
      <SectionTitle>Category</SectionTitle>
      <ul className="flex flex-col gap-xs">
        <CategoryItem
          label="Language"
          category="language"
          count={categoriesMap['language'] ?? 0}
          isNotLink
        />
        <li>
          <ul className="flex flex-col gap-xs">
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
          <ul className="flex flex-col gap-xs">
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
          <ul className="flex flex-col gap-xs">
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
