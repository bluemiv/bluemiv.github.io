import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NoteDetailPage } from "@/components/widgets/NoteDetailPage";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import {
  getNoteDocument,
  getNoteMetadata,
  getPublishedNotes,
} from "@/features/note/noteRepository";
import { getNoteNavigation } from "@/features/note/noteNavigation";
import { getNoteStructuredData, serializeNoteStructuredData } from "@/features/note/noteSeo";
import { createArticleSocialMetadata } from "@/features/seo/socialMetadata";

const NOTE_LOCALE = "ko";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedNotes(NOTE_LOCALE).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteMetadata(slug, NOTE_LOCALE);

  if (!note?.isPublished) notFound();

  const canonical = getLocalizedPath(NOTE_LOCALE, `notes/${note.slug}`);

  return {
    title: note.title,
    description: note.description,
    authors: [{ name: note.author }],
    keywords: note.tags,
    alternates: {
      canonical,
      languages: {
        ko: canonical,
        "x-default": canonical,
      },
    },
    ...createArticleSocialMetadata({
      title: note.title,
      description: note.description,
      canonical,
      locale: NOTE_LOCALE,
      publishedAt: note.publishedAt,
      modifiedAt: note.modifiedAt,
      author: note.author,
      tags: note.tags,
      image: note.coverImage ? { url: note.coverImage, alt: note.title } : undefined,
    }),
  };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const noteDocument = getNoteDocument(slug, NOTE_LOCALE);

  if (!noteDocument?.metadata.isPublished) notFound();

  const { metadata: note } = noteDocument;

  const { default: NoteBody } = await import(`@/notes/${slug}/${NOTE_LOCALE}.mdx`);
  const notes = getPublishedNotes(NOTE_LOCALE);
  const navigation = getNoteNavigation(note, notes);
  const canonical = getLocalizedPath(NOTE_LOCALE, `notes/${note.slug}`);
  const structuredData = getNoteStructuredData(note, canonical);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeNoteStructuredData(structuredData) }}
      />
      <NoteDetailPage note={note} headings={noteDocument.headings} navigation={navigation}>
        <NoteBody />
      </NoteDetailPage>
    </>
  );
}
