import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { Locale } from "@/features/i18n/localeConfig";

import { parseArticleMetadata, type ArticleMetadata } from "./articleMetadata";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "src/articles");

function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function getArticleMetadata(slug: string, locale: Locale): ArticleMetadata | null {
  const articlePath = path.join(ARTICLES_DIRECTORY, slug, `${locale}.mdx`);

  if (!fs.existsSync(articlePath)) return null;

  const { data } = matter(fs.readFileSync(articlePath, "utf8"));
  const metadata = parseArticleMetadata(data);

  if (metadata.slug !== slug || metadata.locale !== locale) {
    throw new Error(`Article path and metadata mismatch: ${articlePath}`);
  }

  return metadata;
}

export function getPublishedArticles(locale: Locale): ArticleMetadata[] {
  return getArticleSlugs()
    .map((slug) => getArticleMetadata(slug, locale))
    .filter((article): article is ArticleMetadata => article?.isPublished === true)
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}
