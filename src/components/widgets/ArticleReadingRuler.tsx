"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import type { ArticleHeading } from "@/features/article/articleDocument";
import { ARTICLE_READING_HEADER_SLOT_ID } from "@/features/article/articleReadingProgress";
import { useArticleReading } from "@/features/article/ArticleReadingProvider";

type PropsWithArticleReadingRuler = {
  headings: readonly ArticleHeading[];
};

function padNumber(value: number): string {
  return String(value).padStart(2, "0");
}

function subscribeToClientEnvironment(): () => void {
  return () => undefined;
}

export function ArticleReadingRuler({ headings }: PropsWithArticleReadingRuler) {
  const { activeId, isScrolling, percentage } = useArticleReading();
  const isClient = useSyncExternalStore(
    subscribeToClientEnvironment,
    () => true,
    () => false,
  );
  const headerSlot = isClient ? document.getElementById(ARTICLE_READING_HEADER_SLOT_ID) : null;

  if (!headings.length) return null;

  const activeHeadingIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeId),
  );
  const majorHeadings = headings
    .map((heading, index) => ({ ...heading, index }))
    .filter(({ depth }) => depth === 2);
  const activeMajorHeadingIndex = Math.max(
    0,
    majorHeadings.findLastIndex(({ index }) => index <= activeHeadingIndex),
  );
  const currentSection = padNumber(activeHeadingIndex + 1);
  const totalSections = padNumber(headings.length);
  const formattedPercentage = String(percentage).padStart(3, "0");
  const progressLabel = `읽기 진행률 ${percentage}%, ${headings.length}개 중 ${activeHeadingIndex + 1}번째 구간`;
  const fillScale = percentage / 100;

  const compactGauge = (
    <div
      className="border-border text-muted mr-1 flex h-8 items-center gap-1.5 border-r px-2 font-mono text-xs tracking-[0.04em] min-[1360px]:hidden"
      role="progressbar"
      aria-label="글 읽기 진행률"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-valuetext={progressLabel}
    >
      <span
        aria-hidden="true"
        className="bg-border-strong relative block h-5 w-0.5 shrink-0 overflow-hidden"
      >
        <span
          className="bg-accent absolute inset-0 origin-bottom transition-transform [transition-duration:var(--motion-duration-base)] motion-reduce:transition-none"
          style={{ transform: `scaleY(${fillScale})` }}
        />
      </span>
      <span className="text-accent w-[2.6rem] text-right font-semibold tabular-nums">
        {formattedPercentage}%
      </span>
      <span className="text-subtle hidden tabular-nums sm:inline">
        {currentSection}/{totalSections}
      </span>
    </div>
  );

  return (
    <>
      {headerSlot ? createPortal(compactGauge, headerSlot) : null}

      <aside
        className="article-reading-ruler text-muted fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 flex-col items-end font-mono text-xs opacity-55 transition-opacity [transition-duration:var(--motion-duration-base)] hover:opacity-100 motion-reduce:transition-none min-[1360px]:flex"
        data-scrolling={isScrolling}
        aria-label={progressLabel}
      >
        <div className="border-border mb-2 flex w-20 items-center justify-between border-b pb-2 tracking-[0.08em]">
          <span className="text-subtle">READ</span>
          <span className="text-accent font-semibold tabular-nums">{formattedPercentage}%</span>
        </div>
        <nav aria-label="글 주요 구간">
          <div className="relative">
            <span aria-hidden="true" className="bg-border-strong absolute inset-y-4 right-0 w-px" />
            <span
              aria-hidden="true"
              className="bg-accent absolute inset-y-4 right-0 w-0.5 origin-top transition-transform [transition-duration:var(--motion-duration-base)] motion-reduce:transition-none"
              style={{ transform: `scaleY(${fillScale})` }}
            />
            <ol className="relative max-h-[60vh] [scrollbar-width:none] overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {majorHeadings.map((heading, index) => {
                const isActive = index === activeMajorHeadingIndex;
                const isComplete = index < activeMajorHeadingIndex;

                return (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      aria-current={isActive ? "location" : undefined}
                      aria-label={`${heading.number} ${heading.title}로 이동`}
                      title={heading.title}
                      className="group focus-visible:outline-accent flex min-h-8 w-20 items-center justify-end gap-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <span
                        className={`tabular-nums transition-colors [transition-duration:var(--motion-duration-fast)] ${
                          isActive ? "text-accent" : "text-subtle group-hover:text-foreground"
                        }`}
                      >
                        {heading.number}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`block h-px origin-right transition-[width,background-color] [transition-duration:var(--motion-duration-base)] motion-reduce:transition-none ${
                          isActive
                            ? "bg-accent w-7"
                            : isComplete
                              ? "bg-accent/60 w-5"
                              : "bg-border-strong group-hover:bg-foreground w-3 group-hover:w-5"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
        <span className="border-border mt-2 w-20 border-t pt-2 text-right tabular-nums">
          {currentSection}/{totalSections}
        </span>
      </aside>
    </>
  );
}
