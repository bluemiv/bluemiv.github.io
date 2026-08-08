"use client";

import { useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";

import type { ArticleHeading } from "@/features/article/articleDocument";

type PropsWithArticleTableOfContents = {
  headings: readonly ArticleHeading[];
  variant: "desktop" | "mobile";
};

export function ArticleTableOfContents({ headings, variant }: PropsWithArticleTableOfContents) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeading = entries.find((entry) => entry.isIntersecting);
        if (visibleHeading) setActiveId(visibleHeading.target.id);
      },
      { rootMargin: "-18% 0px -72%", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  const links = (
    <ol className={variant === "desktop" ? "border-border border-l" : "pt-2"}>
      {headings.map((heading) => {
        const isActive = activeId === heading.id;

        return (
          <li key={heading.id} className={heading.depth === 3 ? "pl-4" : undefined}>
            <a
              href={`#${heading.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`relative block text-sm leading-6 transition-colors duration-150 motion-reduce:transition-none ${
                variant === "desktop"
                  ? `-ml-px py-2 pl-4 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted hover:text-foreground"
                    }`
                  : `py-2 ${isActive ? "text-accent font-semibold" : "text-muted"}`
              }`}
            >
              {variant === "desktop" ? (
                <span
                  aria-hidden="true"
                  className={`bg-accent absolute top-2 bottom-2 left-0 w-px origin-center transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none ${
                    isActive ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"
                  }`}
                />
              ) : null}
              <span className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`text-micro min-w-9 pt-px font-mono leading-6 transition-colors duration-150 motion-reduce:transition-none ${isActive ? "text-accent" : "text-muted"}`}
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
            <span className="text-muted text-micro font-mono">{headings.length} SECTIONS</span>
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
      <div className="border-border mb-3 flex items-center justify-between border-b pb-3">
        <h2 id="article-toc-title" className="text-xs font-bold tracking-[0.08em] uppercase">
          On this page
        </h2>
        <span className="text-subtle text-micro font-mono">{headings.length} SECTIONS</span>
      </div>
      {links}
    </nav>
  );
}
