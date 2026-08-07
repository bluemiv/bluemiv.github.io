import type { ArticleMetadata } from "./articleMetadata";

export type ArticleTopicSummary = {
  topic: string;
  count: number;
};

export type ArticleHomeSelection = {
  featuredArticle: ArticleMetadata | null;
  latestArticles: ArticleMetadata[];
};

export function selectHomeArticles(
  articles: readonly ArticleMetadata[],
  latestLimit = 6,
): ArticleHomeSelection {
  const limit = Math.max(0, latestLimit);

  return {
    featuredArticle: articles[0] ?? null,
    latestArticles: articles.slice(1, limit + 1),
  };
}

export function summarizeArticleTopics(
  articles: readonly ArticleMetadata[],
  topicLimit = 6,
): ArticleTopicSummary[] {
  const topicCounts = new Map<string, number>();

  for (const article of articles) {
    topicCounts.set(article.topic, (topicCounts.get(article.topic) ?? 0) + 1);
  }

  return Array.from(topicCounts, ([topic, count]) => ({ topic, count }))
    .sort((left, right) => right.count - left.count || left.topic.localeCompare(right.topic))
    .slice(0, Math.max(0, topicLimit));
}
