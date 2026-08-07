import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { Locale } from "@/features/i18n/localeConfig";

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
  const notePath = path.join(NOTES_DIRECTORY, slug, `${locale}.mdx`);

  if (!fs.existsSync(notePath)) return null;

  const { data } = matter(fs.readFileSync(notePath, "utf8"));
  const metadata = parseNoteMetadata(data);

  if (metadata.slug !== slug || metadata.locale !== locale) {
    throw new Error(`Note path and metadata mismatch: ${notePath}`);
  }

  return metadata;
}

export function getPublishedNotes(locale: Locale): NoteMetadata[] {
  return getNoteSlugs()
    .map((slug) => getNoteMetadata(slug, locale))
    .filter((note): note is NoteMetadata => note?.isPublished === true)
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}
