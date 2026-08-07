import { ArticleTableOfContents } from "@/components/widgets/ArticleTableOfContents";
import type { ArticleHeading } from "@/features/article/articleDocument";
import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";

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
    <aside className="hidden w-[300px] xl:block" aria-label="글 정보와 목차">
      <section className="border-border border-b pb-5" aria-labelledby="article-context-title">
        <p className="text-accent font-mono text-[9px] tracking-[0.16em] uppercase">
          Article context
        </p>
        <h2 id="article-context-title" className="mt-3 text-lg font-semibold uppercase">
          {topic}
        </h2>
        <p className="text-subtle mt-2 font-mono text-[10px] uppercase">
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
