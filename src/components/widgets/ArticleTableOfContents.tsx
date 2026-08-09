"use client";

import { ChevronDown } from "lucide-react";

import type { ArticleHeading } from "@/features/article/articleDocument";
import { useArticleReading } from "@/features/article/ArticleReadingProvider";

type PropsWithArticleTableOfContents = {
  headings: readonly ArticleHeading[];
  variant: "desktop" | "mobile";
};

export function ArticleTableOfContents({ headings, variant }: PropsWithArticleTableOfContents) {
  const { activeId } = useArticleReading();

  if (!headings.length) return null;

  const links = (
    <ol className={variant === "desktop" ? "border-border border-l" : "pt-2"}>
      {headings.map((heading) => {
        const isActive = activeId === heading.id;

        return (
          <li
            key={heading.id}
            className={heading.depth === 3 ? (variant === "desktop" ? "pl-3" : "pl-4") : undefined}
          >
            <a
              href={`#${heading.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`relative block transition-colors duration-150 motion-reduce:transition-none ${
                variant === "desktop"
                  ? `-ml-px py-1.5 pl-3 text-xs leading-5 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted hover:text-foreground"
                    }`
                  : `py-2 text-sm leading-6 ${isActive ? "text-accent font-semibold" : "text-muted"}`
              }`}
            >
              {variant === "desktop" ? (
                <span
                  aria-hidden="true"
                  className={`bg-accent absolute top-1.5 bottom-1.5 left-0 w-px origin-center transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none ${
                    isActive ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"
                  }`}
                />
              ) : null}
              <span className={`flex items-start ${variant === "desktop" ? "gap-2.5" : "gap-3"}`}>
                <span
                  aria-hidden="true"
                  className={`${variant === "desktop" ? "min-w-8 leading-5" : "min-w-9 leading-6"} pt-px font-mono text-xs transition-colors duration-150 motion-reduce:transition-none ${isActive ? "text-accent" : "text-muted"}`}
                >
                  {heading.number}
                </span>
                <span>{heading.title}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <details className="border-border group border-y xl:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span>이 글의 목차</span>
          <span className="flex items-center gap-3">
            <span className="text-muted font-mono text-xs">{headings.length} SECTIONS</span>
            <ChevronDown
              aria-hidden="true"
              className="text-muted size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </span>
        </summary>
        <nav className="border-border border-t pb-4" aria-label="이 글의 목차">
          {links}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-labelledby="article-toc-title">
      <div className="border-border mb-2 flex items-center justify-between border-b pb-2">
        <h2 id="article-toc-title" className="text-xs font-bold tracking-[0.08em] uppercase">
          On this page
        </h2>
        <span className="text-subtle font-mono text-xs">{headings.length} SECTIONS</span>
      </div>
      {links}
    </nav>
  );
}
