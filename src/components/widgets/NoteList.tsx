import { NoteListRow } from "@/components/widgets/NoteListRow";
import type { Locale } from "@/features/i18n/localeConfig";
import type { NoteMetadata } from "@/features/note/noteMetadata";

type PropsWithNoteList = {
  emptyMessage: string;
  locale: Locale;
  notes: readonly NoteMetadata[];
};

export function NoteList({ emptyMessage, locale, notes }: PropsWithNoteList) {
  if (notes.length === 0) {
    return (
      <p className="border-border text-muted border-b py-14 text-sm leading-7">{emptyMessage}</p>
    );
  }

  return (
    <ol>
      {notes.map((note) => (
        <li key={note.id}>
          <NoteListRow locale={locale} note={note} />
        </li>
      ))}
    </ol>
  );
}
