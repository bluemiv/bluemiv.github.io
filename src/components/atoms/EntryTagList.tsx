import type { PropsWithClassName } from "@/types/componentProps";

type PropsWithEntryTagList = PropsWithClassName<{
  label?: string;
  tags: readonly string[];
}>;

export function EntryTagList({
  className = "",
  label = "Filed under",
  tags,
}: PropsWithEntryTagList) {
  if (tags.length === 0) return null;

  return (
    <footer className={`border-border border-t pt-7 ${className}`}>
      <p className="text-muted font-mono text-xs tracking-[0.16em] uppercase">{label}</p>
      <ul className="text-muted mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {tags.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>
    </footer>
  );
}
