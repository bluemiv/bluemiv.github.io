import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  prefix: string;
  currentPageNum: number;
  totalPageNum: number;
}

export const Pagination = ({ prefix, currentPageNum, totalPageNum }: Props) => {
  return (
    <div className="w-full flex items-center justify-center gap-sm">
      {Array.from({ length: totalPageNum }, (_, idx) => idx + 1).map((page) => (
        <div
          key={page}
          className={clsx(
            ' w-[32px] h-[32px] flex items-center justify-center rounded-md',
            page === currentPageNum
              ? 'bg-app-primary dark:bg-app-dark-primary text-white cursor-not-allowed'
              : 'bg-app-sub-bg dark:bg-app-dark-sub-bg hover:bg-app-primary dark:hover:bg-app-dark-primary hover:text-white duration-100 ease-in-out cursor-pointer',
          )}
        >
          {page === currentPageNum ? (
            <span>{page}</span>
          ) : (
            <Link
              className="w-full h-full flex items-center justify-center"
              href={[prefix, page].join('/')}
            >
              {page}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
