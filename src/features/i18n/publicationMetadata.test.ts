import { describe, expect, it } from "vitest";

import { formatApproximateReadingTime, formatPublicationDate } from "./publicationMetadata";
import { PUBLICATION_METADATA_COPY } from "./translations";

describe("publicationMetadata", () => {
  it.each([
    ["ko", "2025. 01. 02."],
    ["en", "01/02/2025"],
    ["ja", "2025/01/02"],
  ] as const)("locale에 맞는 고정 날짜 형식을 사용한다: %s", (locale, expected) => {
    expect(formatPublicationDate("2025-01-01T15:30:00.000Z", locale)).toBe(expected);
  });

  it.each([
    ["ko", 7, "약 7분"],
    ["en", 7, "About 7 min"],
    ["ja", 7, "約7分"],
  ] as const)("locale에 맞는 예상 읽기 시간을 만든다: %s", (locale, minutes, expected) => {
    expect(formatApproximateReadingTime(minutes, locale)).toBe(expected);
  });

  it("읽기 시간을 최소 1분으로 반올림한다", () => {
    expect(formatApproximateReadingTime(0, "ko")).toBe("약 1분");
    expect(formatApproximateReadingTime(1.6, "ko")).toBe("약 2분");
  });

  it("모든 locale의 발행 정보 문구를 제공한다", () => {
    expect(PUBLICATION_METADATA_COPY.ko.publishedAt).toBe("발행");
    expect(PUBLICATION_METADATA_COPY.en.modifiedAt).toBe("Updated");
    expect(PUBLICATION_METADATA_COPY.ja.readingTime).toBe("推定読了時間");
  });
});
