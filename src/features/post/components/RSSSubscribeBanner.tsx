import Link from 'next/link';
import { RSSIcon } from '@/shared/components/Icons';
import { ROUTE_PATH } from '@/shared/constants/route';

export const RSSSubscribeBanner = () => {
  return (
    <div className="my-lg rounded-lg border border-app-sub-bg dark:border-app-dark-sub-bg bg-app-sub-bg/50 dark:bg-app-dark-sub-bg/50 p-lg flex flex-col sm:flex-row items-center gap-md">
      <div className="shrink-0 w-10 h-10 rounded-full bg-app-primary/10 dark:bg-app-dark-primary/10 flex items-center justify-center text-app-primary dark:text-app-dark-primary">
        <RSSIcon className="w-5" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <p className="text-app-text dark:text-app-dark-text font-semibold text-sm">
          새 글을 놓치지 마세요
        </p>
        <p className="text-app-sub-text dark:text-app-dark-sub-text text-xs mt-xs">
          RSS 피드를 구독하면 새로운 글이 올라올 때마다 받아볼 수 있습니다.
        </p>
      </div>
      <Link
        href={ROUTE_PATH.RSS}
        className="shrink-0 px-md py-sm rounded-lg bg-app-primary dark:bg-app-dark-primary text-white text-sm font-medium hover:opacity-80 duration-100 ease-in-out"
      >
        RSS 구독하기
      </Link>
    </div>
  );
};
