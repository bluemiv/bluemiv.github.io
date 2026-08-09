import type { ReactNode } from "react";

import type { PropsWithClassName } from "@/types/componentProps";

type PropsWithArchivePageHeader = PropsWithClassName<{
  description?: ReactNode;
  eyebrow: ReactNode;
  entryCount?: ReactNode;
  title: ReactNode;
}>;

export function ArchivePageHeader({
  className = "",
  description,
  eyebrow,
  entryCount,
  title,
}: PropsWithArchivePageHeader) {
  return (
    <header className={`border-border border-b pb-12 md:pb-16 ${className}`}>
      <p className="text-accent mb-5 font-mono text-xs font-bold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-balance break-keep sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="text-muted mt-6 max-w-[620px] text-base leading-8 break-keep md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {entryCount ? (
          <span className="text-muted hidden pb-2 font-mono text-xs tabular-nums sm:block">
            {entryCount}
          </span>
        ) : null}
      </div>
    </header>
  );
}
