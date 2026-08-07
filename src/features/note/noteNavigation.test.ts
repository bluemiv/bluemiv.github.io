import { describe, expect, it } from "vitest";

import type { NoteMetadata } from "./noteMetadata";
import { getNoteNavigation } from "./noteNavigation";

function createNote(id: string, publishedAt: string): NoteMetadata {
  return {
    id,
    slug: id,
    locale: "ko",
    legacyPaths: [`/blog/short/${id}/`],
    title: id,
    description: `${id} 설명`,
    publishedAt,
    modifiedAt: publishedAt,
    tags: ["note"],
    isPublished: true,
    author: "Bluemiv",
  };
}

const NOTES = [
  createNote("note-003", "2026-03-01T00:00:00.000Z"),
  createNote("note-002", "2026-02-01T00:00:00.000Z"),
  createNote("note-001", "2026-01-01T00:00:00.000Z"),
] as const;

describe("getNoteNavigation", () => {
  it("최신순 목록에서 더 이전 기록과 더 최근 기록을 찾는다", () => {
    const navigation = getNoteNavigation(NOTES[1], NOTES);

    expect(navigation.newerNote?.id).toBe("note-003");
    expect(navigation.olderNote?.id).toBe("note-001");
  });

  it("목록 양 끝을 처리한다", () => {
    expect(getNoteNavigation(NOTES[0], NOTES).newerNote).toBeNull();
    expect(getNoteNavigation(NOTES[2], NOTES).olderNote).toBeNull();
  });

  it("목록에 없는 note는 이동 경로를 만들지 않는다", () => {
    const missing = createNote("note-004", "2026-04-01T00:00:00.000Z");

    expect(getNoteNavigation(missing, NOTES)).toEqual({ newerNote: null, olderNote: null });
  });
});
