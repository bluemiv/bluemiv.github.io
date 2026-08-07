import type { NoteMetadata } from "./noteMetadata";

export type NoteNavigation = {
  newerNote: NoteMetadata | null;
  olderNote: NoteMetadata | null;
};

export function getNoteNavigation(
  note: NoteMetadata,
  notes: readonly NoteMetadata[],
): NoteNavigation {
  const noteIndex = notes.findIndex(({ id }) => id === note.id);

  return {
    newerNote: noteIndex > 0 ? notes[noteIndex - 1] : null,
    olderNote: noteIndex >= 0 && noteIndex < notes.length - 1 ? notes[noteIndex + 1] : null,
  };
}
