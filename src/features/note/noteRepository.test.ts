import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { getNoteDocument, getNoteMetadata, getPublishedNotes } from "./noteRepository";

describe("noteRepository", () => {
  it("한국어 공개 note를 최신 발행순으로 조회한다", () => {
    const notes = getPublishedNotes("ko");

    expect(notes).toHaveLength(2);
    expect(notes.map(({ slug }) => slug)).toEqual([
      "database-index-basics",
      "nextjs-environment-variables",
    ]);
    expect(notes.every(({ author }) => author === "Bluemiv")).toBe(true);
  });

  it("없는 note나 번역은 null 또는 빈 목록을 반환한다", () => {
    expect(getNoteMetadata("missing-note", "ko")).toBeNull();
    expect(getNoteMetadata("database-index-basics", "ja")).toBeNull();
    expect(getPublishedNotes("ja")).toEqual([]);
  });

  it("note 본문과 TOC heading을 함께 조회한다", () => {
    const note = getNoteDocument("database-index-basics", "ko");

    expect(note?.source).toContain("데이터베이스에서 인덱스");
    expect(note?.headings).toEqual([
      { id: "1-인덱스index란", number: "01", title: "인덱스(Index)란?" },
      { id: "2-인덱스의-종류", number: "02", title: "인덱스의 종류" },
      { id: "3-인덱스-사용시-고려할-점", number: "03", title: "인덱스 사용시 고려할 점" },
    ]);
  });

  it("파일 경로와 metadata가 다르면 build를 실패시킨다", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(`---
id: note-001
slug: another-note
locale: ko
legacyPaths: ['/blog/short/1/']
title: 잘못된 경로
description: 잘못된 경로 테스트
publishedAt: 2026-01-01T00:00:00+09:00
modifiedAt: 2026-01-01T00:00:00+09:00
tags: ['nextjs']
isPublished: true
---
`);

    expect(() => getNoteMetadata("expected-note", "ko")).toThrow("Note path and metadata mismatch");
  });
});
