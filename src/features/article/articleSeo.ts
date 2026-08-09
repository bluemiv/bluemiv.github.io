import { SITE_CONFIG } from "@/config/siteConfig";
import { getTagLabels } from "@/features/tag/tagRegistry";

import type { ArticleMetadata } from "./articleMetadata";
import { getArticleCategoryLabel, getArticleTopicLabel } from "./articleTaxonomy";

export function getArticleStructuredData(article: ArticleMetadata, canonicalPath: string) {
  const canonicalUrl = new URL(canonicalPath, SITE_CONFIG.url).toString();
  const categoryLabel = getArticleCategoryLabel(article.category);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        url: canonicalUrl,
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
        image: article.coverImage
          ? new URL(article.coverImage, SITE_CONFIG.url).toString()
          : undefined,
        keywords: [
          ...new Set([...article.topics.map(getArticleTopicLabel), ...getTagLabels(article.tags)]),
        ].join(", "),
        articleSection: categoryLabel,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: new URL("/", SITE_CONFIG.url).toString(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: new URL("/articles/", SITE_CONFIG.url).toString(),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: categoryLabel,
            item: new URL(`/categories/${article.category}/`, SITE_CONFIG.url).toString(),
          },
          {
            "@type": "ListItem",
            position: 4,
            name: article.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };
}

export function serializeStructuredData(structuredData: unknown): string {
  return JSON.stringify(structuredData).replace(/</g, "\\u003c");
}
