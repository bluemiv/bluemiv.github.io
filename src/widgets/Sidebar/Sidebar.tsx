import { getCategories } from '@/entities/post/api';
import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Sidebar() {
  const categories = getCategories();
  return (
    <aside className="min-w-[250px] hidden md:inline-block pl-md sticky top-[50px] left-0 overflow-y-hidden hover:overscroll-y-auto">
      <section>
        <ul>
          {categories.map((entry) => {
            const category = entry[0];
            const count = entry[1];
            return (
              <li key={category}>
                <Link
                  className="capitalize hover:text-app-primary dark:hover:text-app-dark-primary"
                  href={`${ROUTE_PATH.CATEGORIES}/${category}`}
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
