import type { PropsWithChildren } from "react";

import { CalendarDays, History, UserRound } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { MetadataList, type MetadataListItem } from "@/components/atoms/MetadataList";
import { NoteTableOfContents } from "@/components/widgets/NoteTableOfContents";
import { PageTransition } from "@/components/widgets/PageTransition";
import { SITE_CONFIG } from "@/config/siteConfig";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import { shouldShowNoteTableOfContents, type NoteHeading } from "@/features/note/noteDocument";
import { getNoteNumber } from "@/features/note/noteIdentifier";
import type { NoteMetadata } from "@/features/note/noteMetadata";
import type { NoteNavigation } from "@/features/note/noteNavigation";

type PropsWithNoteDetailPage = PropsWithChildren<{
  headings: readonly NoteHeading[];
  navigation: NoteNavigation;
  note: NoteMetadata;
}>;

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: SITE_CONFIG.timeZone,
});

function getNotePath(slug: string): string {
  return getLocalizedPath("ko", `notes/${slug}`);
}

export function NoteDetailPage({ note, headings, navigation, children }: PropsWithNoteDetailPage) {
  const hasModifiedDate = note.modifiedAt !== note.publishedAt;
  const hasTableOfContents = shouldShowNoteTableOfContents(headings);
  const metadataItems: MetadataListItem[] = [
    {
      icon: UserRound,
      label: "작성자",
      value: note.author,
    },
    {
      icon: CalendarDays,
      label: "발행일",
      value: (
        <time dateTime={note.publishedAt}>{DATE_FORMATTER.format(new Date(note.publishedAt))}</time>
      ),
    },
    ...(hasModifiedDate
      ? [
          {
            icon: History,
            label: "수정일",
            value: (
              <time dateTime={note.modifiedAt}>
                {DATE_FORMATTER.format(new Date(note.modifiedAt))}
              </time>
            ),
          },
        ]
      : []),
  ];

  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <article className="max-w-[760px]" aria-labelledby="note-title">
          <header>
            <Link
              href={getLocalizedPath("ko", "notes")}
              transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
              className="text-muted hover:text-accent inline-flex min-h-11 items-center font-mono text-sm tracking-[0.1em] uppercase transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span className="ml-2">All notes</span>
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span className="bg-accent h-px w-8" aria-hidden="true" />
              <p className="text-accent font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                Note / N{getNoteNumber(note.id)}
              </p>
            </div>

            <h1
              id="note-title"
              className="mt-6 text-4xl leading-[1.14] font-semibold tracking-[-0.05em] text-balance break-keep sm:text-5xl md:text-6xl"
            >
              {note.title}
            </h1>
            <p className="text-muted mt-7 text-lg leading-8 text-pretty break-keep md:text-xl md:leading-9">
              {note.description}
            </p>

            <MetadataList items={metadataItems} />
          </header>

          <div className="mt-12 md:mt-16">
            {hasTableOfContents ? <NoteTableOfContents headings={headings} /> : null}
            <div className={`article-body note-body ${hasTableOfContents ? "mt-10" : ""}`}>
              {children}
            </div>
          </div>

          {note.tags.length ? (
            <footer className="border-border mt-14 border-t pt-7">
              <p className="text-muted font-mono text-xs tracking-[0.16em] uppercase">
                Filed under
              </p>
              <ul className="text-muted mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {note.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            </footer>
          ) : null}

          {navigation.olderNote || navigation.newerNote ? (
            <nav
              className="border-border mt-14 grid border-y sm:grid-cols-2"
              aria-label="더 이전 기록과 더 최근 기록"
            >
              {navigation.olderNote ? (
                <Link
                  href={getNotePath(navigation.olderNote.slug)}
                  transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
                  className="group py-7 sm:pr-7"
                >
                  <span className="text-muted font-mono text-xs tracking-[0.12em] uppercase">
                    ← 더 이전 기록
                  </span>
                  <span className="group-hover:text-accent mt-3 block text-sm leading-6 font-semibold break-keep transition-colors">
                    {navigation.olderNote.title}
                  </span>
                </Link>
              ) : null}
              {navigation.newerNote ? (
                <Link
                  href={getNotePath(navigation.newerNote.slug)}
                  transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
                  className={`border-border group py-7 sm:border-l sm:pl-7 sm:text-right ${
                    navigation.olderNote ? "border-t sm:border-t-0" : "sm:col-start-2"
                  }`}
                >
                  <span className="text-muted font-mono text-xs tracking-[0.12em] uppercase">
                    더 최근 기록 →
                  </span>
                  <span className="group-hover:text-accent mt-3 block text-sm leading-6 font-semibold break-keep transition-colors">
                    {navigation.newerNote.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          ) : null}
        </article>
      </Container>
    </PageTransition>
  );
}
