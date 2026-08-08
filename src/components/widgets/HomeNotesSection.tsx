import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import type { HomeCopy } from "@/features/i18n/translations";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import { getNoteNumber } from "@/features/note/noteIdentifier";
import type { NoteMetadata } from "@/features/note/noteMetadata";

type PropsWithHomeNotesSection = {
  copy: HomeCopy["notes"];
  locale: Locale;
  notes: readonly NoteMetadata[];
};

export function HomeNotesSection({ copy, locale, notes }: PropsWithHomeNotesSection) {
  if (notes.length === 0) return null;

  return (
    <section className="bg-foreground text-canvas py-16 md:py-20" aria-labelledby="notes-title">
      <Container className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-blueprint-400 font-mono text-xs tracking-[0.16em] uppercase">
            {copy.eyebrow}
          </p>
          <h2 id="notes-title" className="font-display mt-4 text-4xl md:text-5xl">
            {copy.heading}
          </h2>
          <p className="text-canvas/70 mt-4 max-w-sm text-sm leading-7">{copy.description}</p>
          <Link
            href={getLocalizedPath(locale, "notes")}
            transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
            className="text-blueprint-400 mt-5 inline-flex min-h-11 items-center text-sm font-bold"
          >
            {copy.action} →
          </Link>
        </div>
        <ol className="border-canvas/25 border-t">
          {notes.slice(0, 3).map((note) => (
            <li key={note.id} className="border-canvas/25 border-b">
              <Link
                href={getLocalizedPath(locale, `notes/${note.slug}`)}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
                className="group grid min-h-20 grid-cols-[48px_1fr_24px] items-center gap-4 py-4 text-sm md:text-base"
              >
                <span className="text-blueprint-400 font-mono text-xs">
                  N{getNoteNumber(note.id)}
                </span>
                <span>{note.title}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
