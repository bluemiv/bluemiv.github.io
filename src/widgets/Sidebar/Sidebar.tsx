import Link from 'next/link';
import { getCategories } from '@/entities/post/api';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Sidebar() {
  const categories = getCategories();
  return (
    <aside className="min-w-[280px] hidden md:inline-block p-md sticky top-[50px] left-0 overflow-y-hidden hover:overscroll-y-auto border-r border-app-sub-bg dark:border-app-dark-sub-bg h-[calc(100vh-50px)]">
      <section>
        <ul className="flex flex-col">
          {categories.map((entry) => {
            const category = entry[0];
            const count = entry[1];
            return (
              <li key={category}>
                <Link
                  className="capitalize hover:text-app-primary dark:hover:text-app-dark-primary flex items-center px-sm h-[36px] hover:bg-app-sub-bg dark:hover:bg-app-dark-sub-bg rounded"
                  href={[ROUTE_PATH.BLOG_CATEGORY, category, '1'].join('/')}
                >
                  {category}
                  <span className="ml-sm text-sm text-app-sub-text dark:text-app-dark-sub-text">
                    ({count})
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
