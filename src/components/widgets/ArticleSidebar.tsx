import Link from "next/link";

import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleTopicSummary } from "@/features/article/articleCollection";
import { getArticleTopicLabel } from "@/features/article/articleTopic";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArticleTopicNavigation = {
  activeTopic: string | null;
  locale: Locale;
  topics: readonly ArticleTopicSummary[];
  totalArticleCount: number;
};

function getTopicPath(locale: Locale, topic: string | null): string {
  return getLocalizedPath(locale, topic ? `topics/${topic}` : "articles");
}

function getTopicItems({
  activeTopic,
  locale,
  topics,
  totalArticleCount,
}: PropsWithArticleTopicNavigation) {
  return [
    {
      href: getTopicPath(locale, null),
      label: "All articles",
      count: totalArticleCount,
      isActive: activeTopic === null,
    },
    ...topics.map(({ topic, count }) => ({
      href: getTopicPath(locale, topic),
      label: getArticleTopicLabel(topic),
      count,
      isActive: topic === activeTopic,
    })),
  ];
}

export function MobileTopicIndex(props: PropsWithArticleTopicNavigation) {
  const items = getTopicItems(props);
  const activeItem = items.find((item) => item.isActive);
  const mobileItems =
    activeItem && activeItem !== items[0]
      ? [items[0], activeItem, ...items.slice(1).filter((item) => item !== activeItem)]
      : items;

  return (
    <nav className="border-border border-b pb-6 xl:hidden" aria-labelledby="mobile-topic-title">
      <h2
        id="mobile-topic-title"
        className="text-muted mb-3 font-mono text-xs tracking-[0.16em] uppercase"
      >
        Browse by topic
      </h2>
      <ul className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {mobileItems.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              transitionTypes={NAVIGATION_TRANSITION_TYPES.swap}
              aria-current={item.isActive ? "page" : undefined}
              className={`inline-flex min-h-11 items-center gap-2 border-b px-2 text-sm whitespace-nowrap transition-colors ${
                item.isActive
                  ? "border-accent text-accent font-semibold"
                  : "text-muted hover:text-foreground border-transparent"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-muted font-mono text-xs tabular-nums">{item.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ArticleSidebar(props: PropsWithArticleTopicNavigation) {
  const items = getTopicItems(props);

  return (
    <aside className="hidden w-[300px] xl:block" aria-label="글 탐색과 광고">
      <nav aria-labelledby="topic-title">
        <div className="border-border flex items-end justify-between border-b pb-4">
          <h2 id="topic-title" className="text-xs font-bold tracking-[0.08em] uppercase">
            Browse by topic
          </h2>
          <span className="text-muted text-micro font-mono tabular-nums">
            {String(props.topics.length).padStart(2, "0")} TOPICS
          </span>
        </div>
        <ol>
          {items.map((item, index) => (
            <li key={item.href} className="border-border border-b">
              <Link
                href={item.href}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.swap}
                aria-current={item.isActive ? "page" : undefined}
                className={`grid min-h-14 grid-cols-[28px_1fr_auto] items-center gap-3 py-3 text-sm transition-colors ${
                  item.isActive
                    ? "border-l-accent text-accent border-l pl-3 font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="text-subtle text-micro font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
                <span className="text-muted text-micro font-mono tabular-nums">{item.count}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12">
        <AdSenseSlot format="sidebar" />
      </div>
    </aside>
  );
}
