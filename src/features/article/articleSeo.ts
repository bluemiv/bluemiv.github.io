import { SITE_CONFIG } from "@/config/siteConfig";

import type { ArticleMetadata } from "./articleMetadata";

export function getArticleStructuredData(article: ArticleMetadata, canonicalPath: string) {
  const canonicalUrl = new URL(canonicalPath, SITE_CONFIG.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    inLanguage: article.locale,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: article.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    image: article.coverImage ? new URL(article.coverImage, SITE_CONFIG.url).toString() : undefined,
    keywords: article.tags.join(", "),
    articleSection: article.topic,
  };
}

export function serializeStructuredData(structuredData: unknown): string {
  return JSON.stringify(structuredData).replace(/</g, "\\u003c");
}
