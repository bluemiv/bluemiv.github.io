"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ArticleHeading } from "./articleDocument";
import {
  getActiveArticleHeadingId,
  getArticleReadingPercentage,
  type ArticleHeadingOffset,
} from "./articleReadingProgress";

type PropsWithArticleReadingProvider = PropsWithChildren<{
  headings: readonly ArticleHeading[];
}>;

type ArticleReadingState = {
  activeId: string;
  isScrolling: boolean;
  percentage: number;
};

const ARTICLE_BODY_ID = "article-body";
const HEADER_HEIGHT = 72;
const HEADING_ACTIVATION_OFFSET = 48;
const SCROLL_IDLE_DELAY = 600;
const ArticleReadingContext = createContext<ArticleReadingState | null>(null);

export function ArticleReadingProvider({ children, headings }: PropsWithArticleReadingProvider) {
  const [state, setState] = useState<ArticleReadingState>({
    activeId: headings[0]?.id ?? "",
    isScrolling: false,
    percentage: 0,
  });
  const articleGeometryRef = useRef({ articleHeight: 0, articleTop: 0 });
  const headingOffsetsRef = useRef<readonly ArticleHeadingOffset[]>([]);

  useEffect(() => {
    const articleElement = document.getElementById(ARTICLE_BODY_ID);
    if (!articleElement) return;
    const observedArticle: HTMLElement = articleElement;

    let animationFrameId = 0;
    let isDisposed = false;
    let scrollIdleTimer: number | undefined;

    function updateReadingState() {
      const readingPosition = window.scrollY + HEADER_HEIGHT + HEADING_ACTIVATION_OFFSET;
      const activeId = getActiveArticleHeadingId(headingOffsetsRef.current, readingPosition);
      const percentage = getArticleReadingPercentage({
        ...articleGeometryRef.current,
        headerHeight: HEADER_HEIGHT,
        scrollY: window.scrollY,
        viewportHeight: window.innerHeight,
      });

      setState((current) =>
        current.activeId === activeId && current.percentage === percentage
          ? current
          : { ...current, activeId, percentage },
      );
      animationFrameId = 0;
    }

    function scheduleUpdate() {
      if (animationFrameId) return;
      animationFrameId = window.requestAnimationFrame(updateReadingState);
    }

    function measureArticle() {
      const articleRect = observedArticle.getBoundingClientRect();
      articleGeometryRef.current = {
        articleHeight: observedArticle.offsetHeight,
        articleTop: articleRect.top + window.scrollY,
      };
      headingOffsetsRef.current = headings.flatMap(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return [];

        return [{ id, offsetTop: element.getBoundingClientRect().top + window.scrollY }];
      });
      scheduleUpdate();
    }

    function handleScroll() {
      setState((current) => (current.isScrolling ? current : { ...current, isScrolling: true }));
      if (scrollIdleTimer) window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        setState((current) => (current.isScrolling ? { ...current, isScrolling: false } : current));
      }, SCROLL_IDLE_DELAY);
      scheduleUpdate();
    }

    const resizeObserver = new ResizeObserver(measureArticle);
    resizeObserver.observe(observedArticle);
    if (observedArticle.parentElement) resizeObserver.observe(observedArticle.parentElement);

    measureArticle();
    document.fonts.ready.then(() => {
      if (!isDisposed) measureArticle();
    });
    window.addEventListener("resize", measureArticle);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      isDisposed = true;
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureArticle);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      if (scrollIdleTimer) window.clearTimeout(scrollIdleTimer);
    };
  }, [headings]);

  const value = useMemo(() => state, [state]);

  return <ArticleReadingContext.Provider value={value}>{children}</ArticleReadingContext.Provider>;
}

export function useArticleReading(): ArticleReadingState {
  const context = useContext(ArticleReadingContext);
  if (!context) throw new Error("useArticleReading must be used within ArticleReadingProvider.");
  return context;
}
