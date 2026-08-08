import type { ReactNode } from "react";

import type { PropsWithClassName } from "@/types/componentProps";

type PropsWithSectionHeader = PropsWithClassName<{
  description?: ReactNode;
  eyebrow?: ReactNode;
  heading: ReactNode;
  headingId: string;
  trailing?: ReactNode;
}>;

export function SectionHeader({
  className = "",
  description,
  eyebrow,
  heading,
  headingId,
  trailing,
}: PropsWithSectionHeader) {
  return (
    <div
      className={`border-border grid gap-4 border-b pb-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end ${className}`}
    >
      <div>
        {eyebrow ? (
          <p className="motion-section-marker text-accent font-mono text-xs tracking-[0.16em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className={`${eyebrow ? "mt-2" : ""} text-sm font-bold tracking-[0.08em] uppercase`}
        >
          {heading}
        </h2>
        {description ? <p className="text-muted mt-2 text-sm leading-6">{description}</p> : null}
      </div>
      {trailing ?? null}
    </div>
  );
}
