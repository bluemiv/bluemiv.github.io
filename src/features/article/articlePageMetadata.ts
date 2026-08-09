import type { Metadata } from "next";

import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { createArticleSocialMetadata } from "@/features/seo/socialMetadata";
import { getTagLabels } from "@/features/tag/tagRegistry";

import { getArticleLanguageAlternates } from "./articleLocalization";
import type { ArticleMetadata } from "./articleMetadata";
import { getArticleCategoryLabel, getArticleTopicLabel } from "./articleTaxonomy";

export function createArticlePageMetadata(
  article: ArticleMetadata,
  publishedLocales: readonly Locale[],
): Metadata {
  const canonical = getLocalizedPath(article.locale, `articles/${article.slug}`);
  const tagLabels = getTagLabels(article.tags);
  const keywords = [...new Set([...article.topics.map(getArticleTopicLabel), ...tagLabels])];

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    keywords,
    category: getArticleCategoryLabel(article.category),
    alternates: {
      canonical,
      languages: getArticleLanguageAlternates(article.slug, publishedLocales),
    },
    ...createArticleSocialMetadata({
      title: article.title,
      description: article.description,
      canonical,
      locale: article.locale,
      publishedAt: article.publishedAt,
      modifiedAt: article.modifiedAt,
      author: article.author,
      tags: tagLabels,
      image: article.coverImage ? { url: article.coverImage, alt: article.title } : undefined,
    }),
  };
}
