import { SITE_CONFIG } from "@/config/siteConfig";

import type { NoteMetadata } from "./noteMetadata";

export function getNoteStructuredData(note: NoteMetadata, canonicalPath: string) {
  const canonicalUrl = new URL(canonicalPath, SITE_CONFIG.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    url: canonicalUrl,
    headline: note.title,
    description: note.description,
    inLanguage: note.locale,
    datePublished: note.publishedAt,
    dateModified: note.modifiedAt,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: note.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    image: note.coverImage ? new URL(note.coverImage, SITE_CONFIG.url).toString() : undefined,
    keywords: note.tags.join(", "),
    articleSection: "Notes",
  };
}

export function serializeNoteStructuredData(structuredData: unknown): string {
  return JSON.stringify(structuredData).replace(/</g, "\\u003c");
}
