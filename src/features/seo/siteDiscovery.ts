import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/siteConfig";
import type { AppProfile } from "@/features/app/appProfiles";
import {
  filterArticlesByTopic,
  summarizeArticleTopics,
} from "@/features/article/articleCollection";
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
  appProfiles: readonly AppProfile[],
): MetadataRoute.Sitemap {
  const articles = sourceArticles.filter(({ isPublished }) => isPublished);
  const notes = sourceNotes.filter(({ isPublished }) => isPublished);
  const latestDocuments = [...articles, ...notes];
  const languageAlternates = Object.fromEntries(
    Object.entries(getLanguageAlternates()).map(([locale, path]) => [
      locale,
      getAbsoluteSiteUrl(path),
    ]),
  );

  const homeEntries: MetadataRoute.Sitemap = SUPPORTED_LOCALES.map((locale) => ({
    ...getSitemapEntry(getLocalizedPath(locale), locale === "ko" ? latestDocuments : []),
    alternates: { languages: languageAlternates },
  }));

  const articleArchiveEntries = getArticleArchivePageNumbers(articles.length).map((pageNumber) => {
    const pagination = paginateArticles(articles, pageNumber);
    if (!pagination) throw new Error(`Article archive page ${pageNumber} must exist`);

    return getSitemapEntry(getArticleArchivePagePath("ko", pageNumber), pagination.articles);
  });

  const articleEntries = articles.map((article) =>
    getSitemapEntry(
      getLocalizedPath("ko", `articles/${article.slug}`),
      [article],
      article.coverImage ? [article.coverImage] : [],
    ),
  );

  const topicEntries = summarizeArticleTopics(articles, articles.length).map(({ topic }) =>
    getSitemapEntry(
      getLocalizedPath("ko", `topics/${topic}`),
      filterArticlesByTopic(articles, topic),
    ),
  );

  const noteEntries = notes.map((note) =>
    getSitemapEntry(
      getLocalizedPath("ko", `notes/${note.slug}`),
      [note],
      note.coverImage ? [note.coverImage] : [],
    ),
  );
  const appEntries = appProfiles.map((profile) =>
    getSitemapEntry(getLocalizedPath("ko", `apps/${profile.slug}`)),
  );

  return [
    ...homeEntries,
    ...articleArchiveEntries,
    ...articleEntries,
    ...topicEntries,
    getSitemapEntry(getLocalizedPath("ko", "notes"), notes),
    ...noteEntries,
    ...appEntries,
  ];
}
