import type { Metadata } from "next";

import { ArticlesArchivePage } from "@/components/widgets/ArticlesArchivePage";
import { getArticleArchiveMetadata } from "@/features/article/articleArchiveSeo";
import { summarizeArticleTopics } from "@/features/article/articleCollection";
import { paginateArticles } from "@/features/article/articlePagination";
import { getPublishedArticles } from "@/features/article/articleRepository";

const ARTICLE_LOCALE = "ko";

function getFirstArticleArchivePage() {
  const articles = getPublishedArticles(ARTICLE_LOCALE);
  const pagination = paginateArticles(articles, 1);

  if (!pagination) throw new Error("The first article archive page must exist");

  return { articles, pagination };
}

export function generateMetadata(): Metadata {
  return getArticleArchiveMetadata(ARTICLE_LOCALE, getFirstArticleArchivePage().pagination);
}

export default function ArticlesPage() {
  const { articles, pagination } = getFirstArticleArchivePage();
  const topics = summarizeArticleTopics(articles, articles.length);

  return (
    <ArticlesArchivePage
      activeTopic={null}
      articles={pagination.articles}
      locale={ARTICLE_LOCALE}
      pagination={pagination}
      topics={topics}
      totalArticleCount={articles.length}
    />
  );
}
