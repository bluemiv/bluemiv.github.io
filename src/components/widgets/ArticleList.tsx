import type { ReactNode } from "react";

import { ArticleListRow } from "@/components/widgets/ArticleListRow";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import type { Locale } from "@/features/i18n/localeConfig";

type PropsWithArticleList = {
  articles: readonly ArticleMetadata[];
  emptyMessage: string;
  insertAfter?: {
    index: number;
    node: ReactNode;
  };
  locale: Locale;
};

export function ArticleList({ articles, emptyMessage, insertAfter, locale }: PropsWithArticleList) {
  if (articles.length === 0) {
    return (
      <p className="border-border text-muted border-b py-14 text-sm leading-7">{emptyMessage}</p>
    );
  }

  return (
    <ol>
      {articles.map((article, index) => (
        <li key={article.id}>
          <ArticleListRow article={article} locale={locale} />
          {insertAfter?.index === index ? insertAfter.node : null}
        </li>
      ))}
    </ol>
  );
}
