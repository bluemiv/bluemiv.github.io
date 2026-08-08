import { Container } from "@/components/atoms/Container";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { ArchivePageHeader } from "@/components/widgets/ArchivePageHeader";
import { NoteListRow } from "@/components/widgets/NoteListRow";
import { PageTransition } from "@/components/widgets/PageTransition";
import type { Locale } from "@/features/i18n/localeConfig";
import type { NoteMetadata } from "@/features/note/noteMetadata";

type PropsWithNotesIndexPage = {
  locale: Locale;
  notes: readonly NoteMetadata[];
};

export function NotesIndexPage({ locale, notes }: PropsWithNotesIndexPage) {
  return (
    <PageTransition>
      <Container className="py-16 md:py-24">
        <ArchivePageHeader
          className="max-w-[920px]"
          description="한 가지 개념과 작은 문제 해결을 짧고 분명하게 정리합니다."
          eyebrow="Notes / Index"
          title="짧은 기록"
        />

        <section className="mt-12 max-w-[920px] md:mt-16" aria-labelledby="note-list-title">
          <SectionHeader
            eyebrow="Latest first"
            heading="All notes"
            headingId="note-list-title"
            trailing={
              <span className="text-muted font-mono text-xs tabular-nums">
                {String(notes.length).padStart(2, "0")} Entries
              </span>
            }
          />

          {notes.length > 0 ? (
            <ol>
              {notes.map((note) => (
                <li key={note.id}>
                  <NoteListRow locale={locale} note={note} />
                </li>
              ))}
            </ol>
          ) : (
            <p className="border-border text-muted border-b py-14 text-sm leading-7">
              공개된 짧은 기록을 준비하고 있습니다.
            </p>
          )}
        </section>
      </Container>
    </PageTransition>
  );
}
