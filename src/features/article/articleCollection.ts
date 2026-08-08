import type { ArticleMetadata } from "./articleMetadata";
import { ARTICLE_TAXONOMY, type ArticleCategory, type ArticleTopic } from "./articleTaxonomy";

export type ArticleTopicSummary = {
  topic: ArticleTopic;
  count: number;
};

export type ArticleCategorySummary = {
  category: ArticleCategory;
  count: number;
  topics: ArticleTopicSummary[];
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
    for (const topic of new Set(article.topics)) {
      topicCounts.set(topic, (topicCounts.get(topic) ?? 0) + 1);
    }
  }

  return Array.from(topicCounts, ([topic, count]) => ({ topic: topic as ArticleTopic, count }))
    .sort((left, right) => right.count - left.count || left.topic.localeCompare(right.topic))
    .slice(0, Math.max(0, topicLimit));
}

export function summarizeArticleTaxonomy(
  articles: readonly ArticleMetadata[],
): ArticleCategorySummary[] {
  return ARTICLE_TAXONOMY.map((categoryDefinition) => {
    const categoryArticles = articles.filter(
      ({ category }) => category === categoryDefinition.slug,
    );
    const topicCounts = new Map(
      summarizeArticleTopics(categoryArticles, Number.POSITIVE_INFINITY).map(({ topic, count }) => [
        topic,
        count,
      ]),
    );

    return {
      category: categoryDefinition.slug,
      count: categoryArticles.length,
      topics: categoryDefinition.topics
        .map(({ slug }) => ({ topic: slug, count: topicCounts.get(slug) ?? 0 }))
        .filter(({ count }) => count > 0),
    };
  }).filter(({ count }) => count > 0);
}

export function filterArticlesByCategory(
  articles: readonly ArticleMetadata[],
  category: string | null,
): ArticleMetadata[] {
  return category ? articles.filter((article) => article.category === category) : [...articles];
}

export function filterArticlesByTopic(
  articles: readonly ArticleMetadata[],
  topic: string | null,
): ArticleMetadata[] {
  return topic
    ? articles.filter((article) => article.topics.includes(topic as ArticleTopic))
    : [...articles];
}

export function getEarliestArticlePublicationYear(
  articles: readonly ArticleMetadata[],
  timeZone: string,
): number | null {
  if (!articles.length) return null;

  const yearFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone,
  });

  return Math.min(
    ...articles.map((article) => Number(yearFormatter.format(new Date(article.publishedAt)))),
  );
}
