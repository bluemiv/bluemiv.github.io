import { z } from "zod";

import { SITE_CONFIG } from "@/config/siteConfig";
import { SUPPORTED_LOCALES } from "@/features/i18n/localeConfig";
import { TAG_KEYS_SCHEMA } from "@/features/tag/tagSchema";

const ISO_DATE_SCHEMA = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString() : value),
  z
    .string()
    .datetime({ offset: true })
    .transform((value) => new Date(value).toISOString()),
);

const NOTE_METADATA_SCHEMA = z
  .object({
    id: z.string().regex(/^note-\d+$/),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    locale: z.enum(SUPPORTED_LOCALES),
    legacyPaths: z.array(z.string().regex(/^\/blog\/short\/[^/]+\/$/)),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: ISO_DATE_SCHEMA,
    modifiedAt: ISO_DATE_SCHEMA,
    tags: TAG_KEYS_SCHEMA,
    isPublished: z.boolean(),
    author: z.string().trim().min(1).optional(),
    coverImage: z.string().startsWith("/").optional(),
  })
  .strict();

type ParsedNoteMetadata = z.infer<typeof NOTE_METADATA_SCHEMA>;

export type NoteMetadata = Omit<ParsedNoteMetadata, "author"> & {
  author: string;
};

export function parseNoteMetadata(input: unknown): NoteMetadata {
  const metadata = NOTE_METADATA_SCHEMA.parse(input);

  return {
    ...metadata,
    author: metadata.author ?? SITE_CONFIG.author,
  };
}
