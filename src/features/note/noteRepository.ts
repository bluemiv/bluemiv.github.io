import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { Locale } from "@/features/i18n/localeConfig";

import { extractNoteHeadings, type NoteHeading } from "./noteDocument";
import { parseNoteMetadata, type NoteMetadata } from "./noteMetadata";

const NOTES_DIRECTORY = path.join(process.cwd(), "src/notes");

function getNoteSlugs(): string[] {
  return fs
    .readdirSync(NOTES_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function getNoteMetadata(slug: string, locale: Locale): NoteMetadata | null {
  return getNoteDocument(slug, locale)?.metadata ?? null;
}

export type NoteDocument = {
  metadata: NoteMetadata;
  source: string;
  headings: NoteHeading[];
};

export function getNoteDocument(slug: string, locale: Locale): NoteDocument | null {
  const notePath = path.join(NOTES_DIRECTORY, slug, `${locale}.mdx`);

  if (!fs.existsSync(notePath)) return null;

  const { data, content: source } = matter(fs.readFileSync(notePath, "utf8"));
  const metadata = parseNoteMetadata(data);

  if (metadata.slug !== slug || metadata.locale !== locale) {
    throw new Error(`Note path and metadata mismatch: ${notePath}`);
  }

  return {
    metadata,
    source,
    headings: extractNoteHeadings(source),
  };
}

export function getPublishedNotes(locale: Locale): NoteMetadata[] {
  return getNoteSlugs()
    .map((slug) => getNoteMetadata(slug, locale))
    .filter((note): note is NoteMetadata => note?.isPublished === true)
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}
