import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NoteDetailPage } from "@/components/widgets/NoteDetailPage";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { getNoteMetadata, getPublishedNotes } from "@/features/note/noteRepository";

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
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: canonical,
      title: note.title,
      description: note.description,
      publishedTime: note.publishedAt,
      modifiedTime: note.modifiedAt,
      authors: [note.author],
      tags: note.tags,
      images: note.coverImage ? [{ url: note.coverImage, alt: note.title }] : undefined,
    },
  };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = getNoteMetadata(slug, NOTE_LOCALE);

  if (!note?.isPublished) notFound();

  return <NoteDetailPage note={note} />;
}
