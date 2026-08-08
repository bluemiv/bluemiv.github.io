import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlesArchivePage } from "@/components/widgets/ArticlesArchivePage";
import {
  filterArticlesByCategory,
  summarizeArticleTaxonomy,
} from "@/features/article/articleCollection";
import { getPublishedArticles } from "@/features/article/articleRepository";
import {
  getArticleCategoryDefinition,
  isArticleCategory,
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
  return getArticleArchiveData().taxonomy.map(({ category }) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[category]">): Promise<Metadata> {
  const { category } = await params;
  const { taxonomy } = getArticleArchiveData();

  if (!isArticleCategory(category) || !taxonomy.some((item) => item.category === category)) {
    notFound();
  }

  const categoryDefinition = getArticleCategoryDefinition(category);
  const canonical = getLocalizedPath(ARTICLE_LOCALE, `categories/${category}`);
  const title = `${categoryDefinition.label} 글`;

  return {
    title,
    description: categoryDefinition.description,
    alternates: {
      canonical,
      languages: {
        ko: canonical,
        "x-default": canonical,
      },
    },
    ...createWebsiteSocialMetadata({
      title,
      description: categoryDefinition.description,
      canonical,
      locale: ARTICLE_LOCALE,
    }),
  };
}

export default async function ArticleCategoryPage({ params }: PageProps<"/categories/[category]">) {
  const { category } = await params;
  const { articles, taxonomy } = getArticleArchiveData();

  if (!isArticleCategory(category) || !taxonomy.some((item) => item.category === category)) {
    notFound();
  }

  return (
    <ArticlesArchivePage
      activeCategory={category}
      activeTopic={null}
      articles={filterArticlesByCategory(articles, category)}
      locale={ARTICLE_LOCALE}
      pagination={null}
      taxonomy={taxonomy}
      totalArticleCount={articles.length}
    />
  );
}
