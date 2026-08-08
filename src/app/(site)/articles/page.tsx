import type { Metadata } from "next";

import { ArticlesArchivePage } from "@/components/widgets/ArticlesArchivePage";
import { summarizeArticleTopics } from "@/features/article/articleCollection";
import { getPublishedArticles } from "@/features/article/articleRepository";

const ARTICLE_LOCALE = "ko";

export const metadata: Metadata = {
  title: "기술 글",
  description: "개발 과정에서 만난 문제와 선택의 이유를 기술별로 분류한 기록입니다.",
  alternates: {
    canonical: "/articles/",
    languages: {
      ko: "/articles/",
      "x-default": "/articles/",
    },
  },
};

export default function ArticlesPage() {
  const articles = getPublishedArticles(ARTICLE_LOCALE);
  const topics = summarizeArticleTopics(articles, articles.length);

  return (
    <ArticlesArchivePage
      activeTopic={null}
      articles={articles}
      locale={ARTICLE_LOCALE}
      topics={topics}
      totalArticleCount={articles.length}
    />
  );
}
