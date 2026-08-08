import Link from "next/link";

import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import type { PropsWithClassName } from "@/types/componentProps";

export type AdjacentEntryNavigationItem = {
  href: string;
  label: string;
  title: string;
};

type PropsWithAdjacentEntryNavigation = PropsWithClassName<{
  ariaLabel: string;
  next: AdjacentEntryNavigationItem | null;
  previous: AdjacentEntryNavigationItem | null;
}>;

export function AdjacentEntryNavigation({
  ariaLabel,
  className = "",
  next,
  previous,
}: PropsWithAdjacentEntryNavigation) {
  if (!previous && !next) return null;

  return (
    <nav
      className={`border-border grid border-y sm:grid-cols-2 ${className}`}
      aria-label={ariaLabel}
    >
      {previous ? (
        <Link
          href={previous.href}
          transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
          className="group py-7 sm:pr-7"
        >
          <span className="text-muted font-mono text-xs tracking-[0.12em] uppercase">
            {previous.label}
          </span>
          <span className="group-hover:text-accent mt-3 block text-sm leading-6 font-semibold break-keep transition-colors">
            {previous.title}
          </span>
        </Link>
      ) : null}
      {next ? (
        <Link
          href={next.href}
          transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
          className={`border-border group py-7 sm:border-l sm:pl-7 sm:text-right ${
            previous ? "border-t sm:border-t-0" : "sm:col-start-2"
          }`}
        >
          <span className="text-muted font-mono text-xs tracking-[0.12em] uppercase">
            {next.label}
          </span>
          <span className="group-hover:text-accent mt-3 block text-sm leading-6 font-semibold break-keep transition-colors">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
