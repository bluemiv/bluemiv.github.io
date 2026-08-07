import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { SITE_CONFIG } from "@/config/siteConfig";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { getNoteNumber } from "@/features/note/noteIdentifier";
import type { NoteMetadata } from "@/features/note/noteMetadata";

type PropsWithNotesIndexPage = {
  locale: Locale;
  notes: readonly NoteMetadata[];
};

type PropsWithNoteRow = {
  locale: Locale;
  note: NoteMetadata;
};

const DATE_LOCALES: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
};

function formatDate(dateTime: string, locale: Locale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: SITE_CONFIG.timeZone,
  }).format(new Date(dateTime));
}

function NoteRow({ locale, note }: PropsWithNoteRow) {
  return (
    <li className="border-border border-b">
      <Link
        href={getLocalizedPath(locale, `notes/${note.slug}`)}
        className="group grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 gap-y-5 py-8 md:grid-cols-[72px_minmax(0,1fr)_128px_24px] md:items-start md:gap-x-6 md:py-10"
      >
        <span className="text-subtle font-display text-2xl leading-none tracking-[-0.04em] md:text-3xl">
          N{getNoteNumber(note.id)}
        </span>

        <span>
          <span className="text-accent flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] font-semibold tracking-[0.08em] uppercase">
            {note.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </span>
          <strong className="group-hover:text-accent mt-3 block text-2xl leading-[1.3] font-semibold tracking-[-0.035em] text-balance transition-colors duration-150 motion-reduce:transition-none md:text-3xl">
            {note.title}
          </strong>
          <span className="text-muted mt-4 line-clamp-3 block max-w-[620px] text-sm leading-7 md:text-base md:leading-8">
            {note.description}
          </span>
        </span>

        <time
          dateTime={note.publishedAt}
          className="text-subtle col-start-2 font-mono text-[10px] tabular-nums md:col-start-3 md:text-right"
        >
          {formatDate(note.publishedAt, locale)}
        </time>

        <span className="text-accent hidden text-lg leading-none md:block" aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}

export function NotesIndexPage({ locale, notes }: PropsWithNotesIndexPage) {
  return (
    <Container className="py-16 md:py-24">
      <header className="border-border max-w-[920px] border-b pb-12 md:pb-16">
        <p className="text-accent mb-5 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
          Notes / Index
        </p>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_240px] md:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.045em] text-balance md:text-6xl">
              짧은 기록
            </h1>
            <p className="text-muted mt-6 max-w-[620px] text-base leading-8 md:text-lg">
              한 가지 개념과 작은 문제 해결을 짧고 분명하게 정리합니다.
            </p>
          </div>
          <dl className="border-border grid grid-cols-[1fr_auto] gap-x-6 border-t pt-4 font-mono text-[10px] leading-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <dt className="text-subtle">ENTRIES</dt>
            <dd className="text-foreground text-right tabular-nums">
              {String(notes.length).padStart(2, "0")}
            </dd>
            <dt className="text-subtle">ORDER</dt>
            <dd className="text-foreground text-right">LATEST</dd>
          </dl>
        </div>
      </header>

      <section className="mt-12 max-w-[920px] md:mt-16" aria-labelledby="note-list-title">
        <div className="border-border flex items-end justify-between gap-6 border-b pb-4">
          <div>
            <p className="text-accent font-mono text-[9px] tracking-[0.16em] uppercase">
              Latest first
            </p>
            <h2 id="note-list-title" className="mt-2 text-sm font-bold tracking-[0.08em] uppercase">
              All notes
            </h2>
          </div>
          <span className="text-subtle font-mono text-[9px] tabular-nums">
            {String(notes.length).padStart(2, "0")} Entries
          </span>
        </div>

        {notes.length > 0 ? (
          <ol>
            {notes.map((note) => (
              <NoteRow key={note.id} locale={locale} note={note} />
            ))}
          </ol>
        ) : (
          <p className="border-border text-muted border-b py-14 text-sm leading-7">
            공개된 짧은 기록을 준비하고 있습니다.
          </p>
        )}
      </section>
    </Container>
  );
}
