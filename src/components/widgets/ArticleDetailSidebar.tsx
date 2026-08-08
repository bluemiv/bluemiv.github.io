import Link from "next/link";

import { ArticleTableOfContents } from "@/components/widgets/ArticleTableOfContents";
import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleHeading } from "@/features/article/articleDocument";
import { getArticleTopicLabel } from "@/features/article/articleTopic";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArticleDetailSidebar = {
  articleId: string;
  topic: string;
  headings: readonly ArticleHeading[];
};

export function ArticleDetailSidebar({
  articleId,
  topic,
  headings,
}: PropsWithArticleDetailSidebar) {
  return (
    <aside className="hidden w-[300px] self-stretch xl:block" aria-label="글 정보와 목차">
      <section className="border-border border-b pb-5" aria-labelledby="article-context-title">
        <p className="text-accent text-micro font-mono tracking-[0.16em] uppercase">
          Article context
        </p>
        <h2 id="article-context-title" className="mt-3 text-lg font-semibold">
          <Link
            href={getLocalizedPath("ko", `topics/${topic}`)}
            transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
            className="hover:text-accent transition-colors"
          >
            {getArticleTopicLabel(topic)}
          </Link>
        </h2>
        <p className="text-muted mt-2 font-mono text-xs uppercase">
          {articleId.replace("article-", "Entry / ")}
        </p>
      </section>

      <div className="mt-10">
        <AdSenseSlot format="sidebar" />
      </div>

      <div className="sticky top-28 mt-14 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6">
        <ArticleTableOfContents headings={headings} variant="desktop" />
      </div>
    </aside>
  );
}
