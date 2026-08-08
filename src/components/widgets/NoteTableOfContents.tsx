import type { NoteHeading } from "@/features/note/noteDocument";

type PropsWithNoteTableOfContents = {
  headings: readonly NoteHeading[];
};

export function NoteTableOfContents({ headings }: PropsWithNoteTableOfContents) {
  return (
    <nav className="border-border border-y py-5" aria-labelledby="note-toc-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="note-toc-title" className="text-xs font-bold tracking-[0.08em] uppercase">
          On this note
        </h2>
        <span className="text-subtle text-micro font-mono">{headings.length} SECTIONS</span>
      </div>

      <ol className="mt-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-muted hover:text-accent grid min-h-11 grid-cols-[36px_minmax(0,1fr)] items-center gap-3 text-sm leading-6 transition-colors"
            >
              <span aria-hidden="true" className="text-muted text-micro font-mono">
                {heading.number}
              </span>
              <span>{heading.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
