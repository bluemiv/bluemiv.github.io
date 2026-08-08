import type { ArticleMetadata } from "./articleMetadata";

export type ArticleNavigation = {
  newerArticle: ArticleMetadata | null;
  olderArticle: ArticleMetadata | null;
  relatedArticles: ArticleMetadata[];
};

export function getArticleNavigation(
  article: ArticleMetadata,
  articles: readonly ArticleMetadata[],
  relatedLimit = 3,
): ArticleNavigation {
  const articleIndex = articles.findIndex(({ id }) => id === article.id);
  const relatedArticles = articles
    .map((candidate, index) => ({
      candidate,
      index,
      sharedTopicCount: candidate.topics.filter((topic) => article.topics.includes(topic)).length,
    }))
    .filter(
      ({ candidate, sharedTopicCount }) =>
        candidate.id !== article.id &&
        candidate.category === article.category &&
        sharedTopicCount > 0,
    )
    .sort(
      (left, right) => right.sharedTopicCount - left.sharedTopicCount || left.index - right.index,
    )
    .map(({ candidate }) => candidate)
    .slice(0, Math.max(0, relatedLimit));

  return {
    newerArticle: articleIndex > 0 ? articles[articleIndex - 1] : null,
    olderArticle:
      articleIndex >= 0 && articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null,
    relatedArticles,
  };
}
