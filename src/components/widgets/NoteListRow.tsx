import Link from "next/link";

import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { formatPublicationDate } from "@/features/i18n/publicationMetadata";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import { getNoteNumber } from "@/features/note/noteIdentifier";
import type { NoteMetadata } from "@/features/note/noteMetadata";
import { getTagLabel } from "@/features/tag/tagRegistry";

type PropsWithNoteListRow = {
  locale: Locale;
  note: NoteMetadata;
};

export function NoteListRow({ locale, note }: PropsWithNoteListRow) {
  return (
    <article className="group border-border relative border-b">
      <Link
        href={getLocalizedPath(locale, `notes/${note.slug}`)}
        transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
        aria-label={note.title}
        className="focus-visible:outline-accent absolute inset-0 z-[1] focus-visible:outline-2 focus-visible:outline-offset-4"
      />

      <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 gap-y-5 py-8 md:grid-cols-[72px_minmax(0,1fr)_128px_24px] md:items-start md:gap-x-6 md:py-10">
        <span className="text-subtle font-display text-2xl leading-none tracking-[-0.04em] md:text-3xl">
          N{getNoteNumber(note.id)}
        </span>

        <span className="min-w-0">
          <span className="text-accent relative z-10 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs font-semibold tracking-[0.08em] uppercase">
            {note.tags.map((tag) => (
              <Link
                key={tag}
                href={getLocalizedPath(locale, `tags/${tag}`)}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.swap}
                className="focus-visible:outline-accent decoration-border-strong rounded-[1px] underline underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                #{getTagLabel(tag)}
              </Link>
            ))}
          </span>
          <strong className="group-hover:text-accent group-focus-within:text-accent mt-3 block text-2xl leading-[1.3] font-semibold tracking-[-0.035em] text-balance break-keep transition-colors duration-150 motion-reduce:transition-none md:text-3xl">
            {note.title}
          </strong>
          <span className="text-muted mt-4 line-clamp-3 block max-w-[620px] text-sm leading-7 break-keep md:text-base md:leading-8">
            {note.description}
          </span>
        </span>

        <span className="col-start-2 flex items-center justify-between gap-4 md:contents">
          <time
            dateTime={note.publishedAt}
            className="text-muted font-mono text-xs tabular-nums md:col-start-3 md:row-start-1 md:text-right"
          >
            {formatPublicationDate(note.publishedAt, locale)}
          </time>
          <span
            className="text-accent text-lg leading-none transition-transform duration-150 group-focus-within:translate-x-1 group-hover:translate-x-1 motion-reduce:transition-none md:col-start-4 md:row-start-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </article>
  );
}
