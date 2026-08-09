import Link from "next/link";

import type { PropsWithClassName } from "@/types/componentProps";

type PropsWithEntryTagList = PropsWithClassName<{
  label?: string;
  tags: readonly {
    href: string;
    label: string;
  }[];
}>;

export function EntryTagList({
  className = "",
  label = "Filed under",
  tags,
}: PropsWithEntryTagList) {
  if (tags.length === 0) return null;

  return (
    <footer className={`border-border border-t pt-7 ${className}`}>
      <p className="text-muted font-mono text-xs tracking-[0.16em] uppercase">{label}</p>
      <ul className="text-muted mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {tags.map(({ href, label: tagLabel }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-accent focus-visible:outline-accent decoration-border-strong rounded-[1px] underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
            >
              #{tagLabel}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
