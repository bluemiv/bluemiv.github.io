import { describe, expect, it } from "vitest";

import { getNoteNumber } from "./noteIdentifier";

describe("getNoteNumber", () => {
  it.each([
    ["note-001", "01"],
    ["note-012", "12"],
    ["note-100", "100"],
  ])("note ID를 화면 번호로 변환한다: %s", (id, expected) => {
    expect(getNoteNumber(id)).toBe(expected);
  });

  it.each(["note-one", "article-001", ""])('잘못된 ID는 "00"을 반환한다: %s', (id) => {
    expect(getNoteNumber(id)).toBe("00");
  });
});
