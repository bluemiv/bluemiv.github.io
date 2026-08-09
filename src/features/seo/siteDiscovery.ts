import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/siteConfig";
import {
  filterArticlesByCategory,
  filterArticlesByTopic,
  summarizeArticleTaxonomy,
  summarizeArticleTopics,
} from "@/features/article/articleCollection";
import { getArticleLanguageAlternates } from "@/features/article/articleLocalization";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import {
  getArticleArchivePageNumbers,
  getArticleArchivePagePath,
  paginateArticles,
} from "@/features/article/articlePagination";
import {
  getLanguageAlternates,
  getLocalizedPath,
  SUPPORTED_LOCALES,
} from "@/features/i18n/localeConfig";
import type { NoteMetadata } from "@/features/note/noteMetadata";
import { filterEntriesByTag, summarizeTags } from "@/features/tag/tagCollection";

export const SITEMAP_PATH = "/sitemap.xml";
export const ATOM_FEED_PATH = "/feed.xml";
export const RSS_FEED_PATH = "/rss.xml";

export const NO_INDEX_FOLLOW_ROBOTS = {
  index: false,
  follow: true,
} as const;

type SearchDocument = Pick<ArticleMetadata | NoteMetadata, "modifiedAt">;

function getLatestModifiedAt(documents: readonly SearchDocument[]): string | undefined {
  return documents.reduce<string | undefined>((latest, document) => {
    return !latest || document.modifiedAt > latest ? document.modifiedAt : latest;
  }, undefined);
}

function getSitemapEntry(
  path: string,
  documents: readonly SearchDocument[] = [],
  images: readonly string[] = [],
): MetadataRoute.Sitemap[number] {
  const lastModified = getLatestModifiedAt(documents);

  return {
    url: getAbsoluteSiteUrl(path),
    lastModified,
    images: images.length ? images.map(getAbsoluteSiteUrl) : undefined,
  };
}

function getAbsoluteLanguageAlternates(languages: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(languages).map(([locale, path]) => [locale, getAbsoluteSiteUrl(path)]),
  );
}

export function getAbsoluteSiteUrl(path: string): string {
  return new URL(path, `${SITE_CONFIG.url}/`).toString();
}

export function getSearchDiscoverySitemaps(): string[] {
  return [SITEMAP_PATH, ATOM_FEED_PATH, RSS_FEED_PATH].map(getAbsoluteSiteUrl);
}

export function createRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: getSearchDiscoverySitemaps(),
  };
}

export function createSitemap(
  sourceArticles: readonly ArticleMetadata[],
  sourceNotes: readonly NoteMetadata[],
): MetadataRoute.Sitemap {
  const articles = sourceArticles.filter(({ isPublished }) => isPublished);
  const notes = sourceNotes.filter(({ isPublished }) => isPublished);
  const defaultArticles = articles.filter(({ locale }) => locale === "ko");
  const defaultNotes = notes.filter(({ locale }) => locale === "ko");
  const latestDocuments = [...defaultArticles, ...defaultNotes];
  const languageAlternates = Object.fromEntries(
    Object.entries(getLanguageAlternates()).map(([locale, path]) => [
      locale,
      getAbsoluteSiteUrl(path),
    ]),
  );

  const homeEntries: MetadataRoute.Sitemap = SUPPORTED_LOCALES.map((locale) => ({
    ...getSitemapEntry(getLocalizedPath(locale), [
      ...articles.filter((article) => article.locale === locale),
      ...notes.filter((note) => note.locale === locale),
    ]),
    alternates: { languages: languageAlternates },
  }));

  const articleArchiveEntries = getArticleArchivePageNumbers(defaultArticles.length).map(
    (pageNumber) => {
      const pagination = paginateArticles(defaultArticles, pageNumber);
      if (!pagination) throw new Error(`Article archive page ${pageNumber} must exist`);

      return getSitemapEntry(getArticleArchivePagePath("ko", pageNumber), pagination.articles);
    },
  );

  const articleEntries = articles.map((article) => {
    const translatedLocales = articles
      .filter(({ id }) => id === article.id)
      .map(({ locale }) => locale);

    return {
      ...getSitemapEntry(
        getLocalizedPath(article.locale, `articles/${article.slug}`),
        [article],
        article.coverImage ? [article.coverImage] : [],
      ),
      alternates: {
        languages: getAbsoluteLanguageAlternates(
          getArticleLanguageAlternates(article.slug, translatedLocales),
        ),
      },
    };
  });

  const categoryEntries = summarizeArticleTaxonomy(defaultArticles).map(({ category }) =>
    getSitemapEntry(
      getLocalizedPath("ko", `categories/${category}`),
      filterArticlesByCategory(defaultArticles, category),
    ),
  );

  const topicEntries = summarizeArticleTopics(defaultArticles, defaultArticles.length).map(
    ({ topic }) =>
      getSitemapEntry(
        getLocalizedPath("ko", `topics/${topic}`),
        filterArticlesByTopic(defaultArticles, topic),
      ),
  );

  const noteEntries = defaultNotes.map((note) =>
    getSitemapEntry(
      getLocalizedPath("ko", `notes/${note.slug}`),
      [note],
      note.coverImage ? [note.coverImage] : [],
    ),
  );
  const tagEntries = summarizeTags(latestDocuments).map(({ tag }) =>
    getSitemapEntry(
      getLocalizedPath("ko", `tags/${tag}`),
      filterEntriesByTag(latestDocuments, tag),
    ),
  );
  return [
    ...homeEntries,
    ...articleArchiveEntries,
    ...articleEntries,
    ...categoryEntries,
    ...topicEntries,
    getSitemapEntry(getLocalizedPath("ko", "notes"), defaultNotes),
    ...noteEntries,
    ...tagEntries,
  ];
}
