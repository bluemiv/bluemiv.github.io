import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlesArchivePage } from "@/components/widgets/ArticlesArchivePage";
import {
  filterArticlesByTopic,
  summarizeArticleTaxonomy,
} from "@/features/article/articleCollection";
import { getPublishedArticles } from "@/features/article/articleRepository";
import {
  getArticleTopicDefinition,
  getArticleTopicLabel,
  isArticleTopic,
} from "@/features/article/articleTaxonomy";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { createWebsiteSocialMetadata } from "@/features/seo/socialMetadata";

const ARTICLE_LOCALE = "ko";

export const dynamicParams = false;

function getArticleArchiveData() {
  const articles = getPublishedArticles(ARTICLE_LOCALE);
  const taxonomy = summarizeArticleTaxonomy(articles);

  return { articles, taxonomy };
}

export function generateStaticParams() {
  return getArticleArchiveData().taxonomy.flatMap(({ topics }) =>
    topics.map(({ topic }) => ({ topic })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/topics/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const { taxonomy } = getArticleArchiveData();
  const publishedTopics = taxonomy.flatMap(({ topics }) => topics.map((item) => item.topic));

  if (!isArticleTopic(topic) || !publishedTopics.includes(topic)) notFound();

  const topicLabel = getArticleTopicLabel(topic);
  const canonical = getLocalizedPath(ARTICLE_LOCALE, `topics/${topic}`);
  const title = `${topicLabel} 기술 글`;
  const description = `${topicLabel} 주제로 분류한 개발 문제 해결 과정과 선택의 이유를 모았습니다.`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ko: canonical,
        "x-default": canonical,
      },
    },
    ...createWebsiteSocialMetadata({
      title,
      description,
      canonical,
      locale: ARTICLE_LOCALE,
    }),
  };
}

export default async function ArticleTopicPage({ params }: PageProps<"/topics/[topic]">) {
  const { topic } = await params;
  const { articles, taxonomy } = getArticleArchiveData();
  const publishedTopics = taxonomy.flatMap(({ topics }) => topics.map((item) => item.topic));

  if (!isArticleTopic(topic) || !publishedTopics.includes(topic)) notFound();
  const topicDefinition = getArticleTopicDefinition(topic);

  return (
    <ArticlesArchivePage
      activeCategory={topicDefinition.category}
      activeTopic={topic}
      articles={filterArticlesByTopic(articles, topic)}
      locale={ARTICLE_LOCALE}
      pagination={null}
      taxonomy={taxonomy}
      totalArticleCount={articles.length}
    />
  );
}
