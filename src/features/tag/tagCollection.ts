import { TAG_DEFINITIONS, type TagKey } from "./tagRegistry";

type TaggedEntry = {
  tags: readonly TagKey[];
};

export type TagSummary = {
  count: number;
  tag: TagKey;
};

export function filterEntriesByTag<TEntry extends TaggedEntry>(
  entries: readonly TEntry[],
  tag: TagKey,
): TEntry[] {
  return entries.filter((entry) => entry.tags.includes(tag));
}

export function summarizeTags(entries: readonly TaggedEntry[]): TagSummary[] {
  const counts = new Map<TagKey, number>();

  entries.forEach(({ tags }) => {
    new Set(tags).forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });

  return TAG_DEFINITIONS.flatMap(({ key }) => {
    const count = counts.get(key);
    return count ? [{ count, tag: key }] : [];
  });
}
