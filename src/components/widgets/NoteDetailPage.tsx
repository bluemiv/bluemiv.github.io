import type { PropsWithChildren } from "react";

import { Container } from "@/components/atoms/Container";
import { EntryTagList } from "@/components/atoms/EntryTagList";
import { PublicationMetadata } from "@/components/atoms/PublicationMetadata";
import { AdjacentEntryNavigation } from "@/components/widgets/AdjacentEntryNavigation";
import { ArchiveBackLink } from "@/components/widgets/ArchiveBackLink";
import { NoteTableOfContents } from "@/components/widgets/NoteTableOfContents";
import { PageTransition } from "@/components/widgets/PageTransition";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { formatPublicationDate } from "@/features/i18n/publicationMetadata";
import { PUBLICATION_METADATA_COPY } from "@/features/i18n/translations";
import { shouldShowNoteTableOfContents, type NoteHeading } from "@/features/note/noteDocument";
import { getNoteNumber } from "@/features/note/noteIdentifier";
import type { NoteMetadata } from "@/features/note/noteMetadata";
import type { NoteNavigation } from "@/features/note/noteNavigation";
import { SearchDocumentMetadata } from "@/features/search/SearchDocumentMetadata";
import { getTagLabels } from "@/features/tag/tagRegistry";

type PropsWithNoteDetailPage = PropsWithChildren<{
  headings: readonly NoteHeading[];
  navigation: NoteNavigation;
  note: NoteMetadata;
}>;

function getNotePath(slug: string): string {
  return getLocalizedPath("ko", `notes/${slug}`);
}

export function NoteDetailPage({ note, headings, navigation, children }: PropsWithNoteDetailPage) {
  const hasModifiedDate = note.modifiedAt !== note.publishedAt;
  const hasTableOfContents = shouldShowNoteTableOfContents(headings);
  const publicationLabels = PUBLICATION_METADATA_COPY[note.locale];

  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <article
          className="max-w-[760px]"
          aria-labelledby="note-title"
          data-pagefind-filter="type:note"
        >
          <header>
            <ArchiveBackLink href={getLocalizedPath("ko", "notes")} label="All notes" />

            <div className="mt-8 flex items-center gap-4">
              <span className="bg-accent h-px w-8" aria-hidden="true" />
              <p className="text-accent font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                Note / N{getNoteNumber(note.id)}
              </p>
            </div>

            <h1
              id="note-title"
              data-pagefind-meta="title"
              className="mt-6 text-4xl leading-[1.14] font-semibold tracking-[-0.05em] text-balance break-keep sm:text-5xl md:text-6xl"
            >
              {note.title}
            </h1>
            <p
              className="text-muted mt-7 text-lg leading-8 text-pretty break-keep md:text-xl md:leading-9"
              data-pagefind-meta="description"
            >
              {note.description}
            </p>

            <PublicationMetadata
              author={note.author}
              labels={publicationLabels}
              publishedAt={{
                dateTime: note.publishedAt,
                text: formatPublicationDate(note.publishedAt, note.locale),
              }}
              modifiedAt={
                hasModifiedDate
                  ? {
                      dateTime: note.modifiedAt,
                      text: formatPublicationDate(note.modifiedAt, note.locale),
                    }
                  : undefined
              }
            />
          </header>

          <div className="mt-12 md:mt-16">
            {hasTableOfContents ? <NoteTableOfContents headings={headings} /> : null}
            <div
              className={`article-body note-body ${hasTableOfContents ? "mt-10" : ""}`}
              data-pagefind-body
            >
              <SearchDocumentMetadata
                description={note.description}
                publishedAt={note.publishedAt}
                tags={note.tags}
                title={note.title}
              />
              {children}
            </div>
          </div>

          <EntryTagList className="mt-14" tags={getTagLabels(note.tags)} />

          <AdjacentEntryNavigation
            ariaLabel="더 이전 기록과 더 최근 기록"
            className="mt-14"
            previous={
              navigation.olderNote
                ? {
                    href: getNotePath(navigation.olderNote.slug),
                    label: "← 더 이전 기록",
                    title: navigation.olderNote.title,
                  }
                : null
            }
            next={
              navigation.newerNote
                ? {
                    href: getNotePath(navigation.newerNote.slug),
                    label: "더 최근 기록 →",
                    title: navigation.newerNote.title,
                  }
                : null
            }
          />
        </article>
      </Container>
    </PageTransition>
  );
}
