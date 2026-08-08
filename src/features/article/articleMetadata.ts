import { z } from "zod";

import { SITE_CONFIG } from "@/config/siteConfig";
import { SUPPORTED_LOCALES } from "@/features/i18n/localeConfig";

import {
  ARTICLE_CATEGORY_SLUGS,
  ARTICLE_TOPIC_SLUGS,
  isArticleTopicInCategory,
} from "./articleTaxonomy";

const ISO_DATE_SCHEMA = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString() : value),
  z
    .string()
    .datetime({ offset: true })
    .transform((value) => new Date(value).toISOString()),
);

const ARTICLE_METADATA_SCHEMA = z
  .object({
    id: z.string().regex(/^article-\d+$/),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .refine((slug) => slug !== "page", { message: "Article slug 'page' is reserved" }),
    locale: z.enum(SUPPORTED_LOCALES),
    category: z.enum(ARTICLE_CATEGORY_SLUGS),
    topics: z
      .array(z.enum(ARTICLE_TOPIC_SLUGS))
      .min(1)
      .refine((topics) => new Set(topics).size === topics.length, {
        message: "Article topics must be unique",
      }),
    legacyPaths: z.array(z.string().regex(/^\/blog\/[a-z0-9-]+\/[^/]+\/$/)),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: ISO_DATE_SCHEMA,
    modifiedAt: ISO_DATE_SCHEMA,
    tags: z.array(z.string().trim().min(1)),
    isPublished: z.boolean(),
    author: z.string().trim().min(1).optional(),
    coverImage: z.string().startsWith("/").optional(),
  })
  .strict()
  .superRefine(({ category, topics }, context) => {
    topics.forEach((topic, index) => {
      if (isArticleTopicInCategory(topic, category)) return;

      context.addIssue({
        code: "custom",
        message: `Article topic '${topic}' does not belong to category '${category}'`,
        path: ["topics", index],
      });
    });
  });

type ParsedArticleMetadata = z.infer<typeof ARTICLE_METADATA_SCHEMA>;

export type ArticleMetadata = Omit<ParsedArticleMetadata, "author"> & {
  author: string;
};

export function parseArticleMetadata(input: unknown): ArticleMetadata {
  const metadata = ARTICLE_METADATA_SCHEMA.parse(input);

  return {
    ...metadata,
    author: metadata.author ?? SITE_CONFIG.author,
  };
}
