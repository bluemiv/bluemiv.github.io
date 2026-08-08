import Link from "next/link";

import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import { getPaginationItems } from "@/features/navigation/pagination";

type PropsWithPaginationNavigation = {
  currentPage: number;
  getPageHref: (pageNumber: number) => string;
  label: string;
  totalPages: number;
};

export function PaginationNavigation({
  currentPage,
  getPageHref,
  label,
  totalPages,
}: PropsWithPaginationNavigation) {
  if (totalPages <= 1) return null;

  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const pageItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav className="mt-8" aria-label={label}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="justify-self-start">
          {previousPage ? (
            <Link
              href={getPageHref(previousPage)}
              transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
              rel="prev"
              className="text-muted hover:text-accent inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors"
              aria-label={`${previousPage}페이지로 이동`}
            >
              <span aria-hidden="true">←</span>
              <span>이전</span>
            </Link>
          ) : null}
        </div>

        <p
          className="text-muted font-mono text-xs tabular-nums sm:hidden"
          aria-label={`현재 ${currentPage}페이지, 전체 ${totalPages}페이지`}
        >
          <span className="text-foreground font-semibold" aria-hidden="true">
            {String(currentPage).padStart(2, "0")}
          </span>
          <span aria-hidden="true"> / </span>
          <span aria-hidden="true">{String(totalPages).padStart(2, "0")}</span>
        </p>

        <ol className="hidden items-center justify-center gap-1 sm:flex">
          {pageItems.map((item, index) => (
            <li key={`${item}-${index}`}>
              {item === "ellipsis" ? (
                <span
                  className="text-subtle inline-flex size-11 items-center justify-center font-mono text-xs"
                  aria-hidden="true"
                >
                  ···
                </span>
              ) : item === currentPage ? (
                <span
                  className="border-accent text-accent inline-flex size-11 items-center justify-center border-b font-mono text-xs font-semibold tabular-nums"
                  aria-current="page"
                  aria-label={`${item}페이지, 현재 페이지`}
                >
                  {String(item).padStart(2, "0")}
                </span>
              ) : (
                <Link
                  href={getPageHref(item)}
                  transitionTypes={
                    item < currentPage
                      ? NAVIGATION_TRANSITION_TYPES.back
                      : NAVIGATION_TRANSITION_TYPES.forward
                  }
                  className="text-muted hover:border-accent hover:text-accent inline-flex size-11 items-center justify-center border-b border-transparent font-mono text-xs tabular-nums transition-colors"
                  aria-label={`${item}페이지로 이동`}
                >
                  {String(item).padStart(2, "0")}
                </Link>
              )}
            </li>
          ))}
        </ol>

        <div className="justify-self-end">
          {nextPage ? (
            <Link
              href={getPageHref(nextPage)}
              transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
              rel="next"
              className="text-muted hover:text-accent inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors"
              aria-label={`${nextPage}페이지로 이동`}
            >
              <span>다음</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
