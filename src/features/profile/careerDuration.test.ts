import { describe, expect, it } from "vitest";

import { calculateCareerMonthOrdinal, formatYearMonth } from "./careerDuration";

describe("careerDuration", () => {
  it("시작월을 1개월째로 포함해 현재 경력 개월 차수를 계산한다", () => {
    expect(calculateCareerMonthOrdinal("2018-08", "2018-08")).toBe(1);
    expect(calculateCareerMonthOrdinal("2018-08", "2026-08")).toBe(97);
    expect(calculateCareerMonthOrdinal("2025-12", "2026-01")).toBe(2);
  });

  it("잘못된 연월과 시작월보다 이른 현재월을 거부한다", () => {
    expect(() => calculateCareerMonthOrdinal("2018-13", "2026-08")).toThrow(RangeError);
    expect(() => calculateCareerMonthOrdinal("2018-08", "2026-8")).toThrow(RangeError);
    expect(() => calculateCareerMonthOrdinal("2018-08", "2018-07")).toThrow(RangeError);
  });

  it("지정 시간대의 연월을 월 경계에서도 안정적으로 만든다", () => {
    const boundary = new Date("2026-07-31T15:00:00.000Z");

    expect(formatYearMonth(boundary, "Asia/Seoul")).toBe("2026-08");
    expect(formatYearMonth(boundary, "America/Los_Angeles")).toBe("2026-07");
  });

  it("유효하지 않은 날짜를 거부한다", () => {
    expect(() => formatYearMonth(new Date(Number.NaN), "Asia/Seoul")).toThrow(RangeError);
  });
});
