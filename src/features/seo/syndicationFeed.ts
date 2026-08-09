import { SITE_CONFIG } from "@/config/siteConfig";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import type { NoteMetadata } from "@/features/note/noteMetadata";
import { getTagLabels } from "@/features/tag/tagRegistry";

import { ATOM_FEED_PATH, getAbsoluteSiteUrl, RSS_FEED_PATH } from "./siteDiscovery";

export const SYNDICATION_FEED_LIMIT = 50;

export type SyndicationEntry = {
  author: string;
  categories: string[];
  description: string;
  modifiedAt: string;
  publishedAt: string;
  title: string;
  url: string;
};

function assertPositiveInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
}

function escapeXml(value: string): string {
  const XML_ENTITIES: Readonly<Record<string, string>> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  };

  return value.replace(/[&<>"']/g, (character) => XML_ENTITIES[character]);
}

function getLatestModifiedAt(entries: readonly SyndicationEntry[]): string {
  if (!entries.length) throw new Error("A syndication feed requires at least one published entry");
  return entries.reduce(
    (latest, entry) => (entry.modifiedAt > latest ? entry.modifiedAt : latest),
    entries[0].modifiedAt,
  );
}

function getUniqueCategories(categories: readonly string[]): string[] {
  return [...new Set(categories.filter(Boolean))];
}

export function getSyndicationEntries(
  sourceArticles: readonly ArticleMetadata[],
  sourceNotes: readonly NoteMetadata[],
  limit = SYNDICATION_FEED_LIMIT,
): SyndicationEntry[] {
  assertPositiveInteger(limit, "limit");

  const articleEntries = sourceArticles
    .filter(({ isPublished }) => isPublished)
    .map((article): SyndicationEntry => ({
      author: article.author,
      categories: getUniqueCategories([
        article.category,
        ...article.topics,
        ...getTagLabels(article.tags),
      ]),
      description: article.description,
      modifiedAt: article.modifiedAt,
      publishedAt: article.publishedAt,
      title: article.title,
      url: getAbsoluteSiteUrl(getLocalizedPath("ko", `articles/${article.slug}`)),
    }));
  const noteEntries = sourceNotes
    .filter(({ isPublished }) => isPublished)
    .map((note): SyndicationEntry => ({
      author: note.author,
      categories: getUniqueCategories(["notes", ...getTagLabels(note.tags)]),
      description: note.description,
      modifiedAt: note.modifiedAt,
      publishedAt: note.publishedAt,
      title: note.title,
      url: getAbsoluteSiteUrl(getLocalizedPath("ko", `notes/${note.slug}`)),
    }));

  return [...articleEntries, ...noteEntries]
    .sort(
      (left, right) =>
        right.modifiedAt.localeCompare(left.modifiedAt) ||
        right.publishedAt.localeCompare(left.publishedAt) ||
        left.url.localeCompare(right.url),
    )
    .slice(0, limit);
}

export function createAtomFeed(entries: readonly SyndicationEntry[]): string {
  const updatedAt = getLatestModifiedAt(entries);
  const siteUrl = getAbsoluteSiteUrl("/");
  const selfUrl = getAbsoluteSiteUrl(ATOM_FEED_PATH);
  const entryXml = entries
    .map(
      (entry) => `  <entry>
    <title>${escapeXml(entry.title)}</title>
    <link href="${escapeXml(entry.url)}" rel="alternate" type="text/html" />
    <id>${escapeXml(entry.url)}</id>
    <published>${escapeXml(entry.publishedAt)}</published>
    <updated>${escapeXml(entry.modifiedAt)}</updated>
    <author><name>${escapeXml(entry.author)}</name></author>
    <summary type="text">${escapeXml(entry.description)}</summary>
${entry.categories.map((category) => `    <category term="${escapeXml(category)}" />`).join("\n")}
  </entry>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_CONFIG.displayTitle)}</title>
  <subtitle>${escapeXml(SITE_CONFIG.description)}</subtitle>
  <link href="${escapeXml(siteUrl)}" rel="alternate" type="text/html" />
  <link href="${escapeXml(selfUrl)}" rel="self" type="application/atom+xml" />
  <id>${escapeXml(siteUrl)}</id>
  <updated>${escapeXml(updatedAt)}</updated>
  <author><name>${escapeXml(SITE_CONFIG.author)}</name></author>
${entryXml}
</feed>
`;
}

export function createRssFeed(entries: readonly SyndicationEntry[]): string {
  const updatedAt = getLatestModifiedAt(entries);
  const siteUrl = getAbsoluteSiteUrl("/");
  const selfUrl = getAbsoluteSiteUrl(RSS_FEED_PATH);
  const itemXml = entries
    .map(
      (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(entry.url)}</link>
      <guid isPermaLink="true">${escapeXml(entry.url)}</guid>
      <description>${escapeXml(entry.description)}</description>
      <pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>
      <atom:updated>${escapeXml(entry.modifiedAt)}</atom:updated>
${entry.categories.map((category) => `      <category>${escapeXml(category)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.displayTitle)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date(updatedAt).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>
`;
}
