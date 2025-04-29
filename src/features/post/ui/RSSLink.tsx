import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';
import RSSIcon from '@/shared/ui/RSSIcon';

export const RSSLink = () => {
  return (
    <Link
      href={ROUTE_PATH.RSS}
      className="inline-block rounded p-xs hover:bg-app-sub-bg dark:hover:bg-app-dark-sub-bg hover:text-app-primary dark:hover:text-app-dark-primary duration-100 ease-in-out"
    >
      <RSSIcon className="w-[1.5rem]" />
    </Link>
  );
};
