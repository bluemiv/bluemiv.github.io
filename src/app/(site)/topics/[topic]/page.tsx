import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlesArchivePage } from "@/components/widgets/ArticlesArchivePage";
import {
  filterArticlesByTopic,
  summarizeArticleTopics,
} from "@/features/article/articleCollection";
import { getPublishedArticles } from "@/features/article/articleRepository";
import { getArticleTopicLabel } from "@/features/article/articleTopic";
import { getLocalizedPath } from "@/features/i18n/localeConfig";

const ARTICLE_LOCALE = "ko";

export const dynamicParams = false;

function getArticleArchiveData() {
  const articles = getPublishedArticles(ARTICLE_LOCALE);
  const topics = summarizeArticleTopics(articles, articles.length);

  return { articles, topics };
}

export function generateStaticParams() {
  return getArticleArchiveData().topics.map(({ topic }) => ({ topic }));
}

export async function generateMetadata({
  params,
}: PageProps<"/topics/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const { topics } = getArticleArchiveData();

  if (!topics.some((item) => item.topic === topic)) notFound();

  const topicLabel = getArticleTopicLabel(topic);
  const canonical = getLocalizedPath(ARTICLE_LOCALE, `topics/${topic}`);

  return {
    title: `${topicLabel} 기술 글`,
    description: `${topicLabel} 주제로 분류한 개발 문제 해결 과정과 선택의 이유를 모았습니다.`,
    alternates: {
      canonical,
      languages: {
        ko: canonical,
        "x-default": canonical,
      },
    },
  };
}

export default async function ArticleTopicPage({ params }: PageProps<"/topics/[topic]">) {
  const { topic } = await params;
  const { articles, topics } = getArticleArchiveData();

  if (!topics.some((item) => item.topic === topic)) notFound();

  return (
    <ArticlesArchivePage
      activeTopic={topic}
      articles={filterArticlesByTopic(articles, topic)}
      locale={ARTICLE_LOCALE}
      pagination={null}
      topics={topics}
      totalArticleCount={articles.length}
    />
  );
}
