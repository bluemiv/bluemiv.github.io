import Link from "next/link";

import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArchiveBackLink = {
  href: string;
  label: string;
};

export function ArchiveBackLink({ href, label }: PropsWithArchiveBackLink) {
  return (
    <Link
      href={href}
      transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
      className="text-muted hover:text-accent inline-flex min-h-11 items-center font-mono text-sm tracking-[0.1em] uppercase transition-colors"
    >
      <span aria-hidden="true">←</span>
      <span className="ml-2">{label}</span>
    </Link>
  );
}
