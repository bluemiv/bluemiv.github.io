import { describe, expect, it } from "vitest";

import { findTypographyViolations } from "./typographyVerification.mjs";

describe("typographyVerification", () => {
  it("Tailwind 표준 단계와 token 기반 CSS를 허용한다", () => {
    expect(
      findTypographyViolations(
        "Typography.tsx",
        '<h1 className="text-4xl sm:text-5xl md:text-6xl">Title</h1>',
      ),
    ).toEqual([]);
    expect(findTypographyViolations("globals.css", "font-size: var(--text-lg);")).toEqual([]);
  });

  it("text-micro와 임의 Tailwind font size를 보고한다", () => {
    const source = '<span className="text-micro">A</span>\n<h1 className="text-[3rem]">B</h1>';

    expect(findTypographyViolations("Typography.tsx", source)).toEqual([
      {
        filePath: "Typography.tsx",
        line: 1,
        value: "text-micro",
        reason: "12px 미만의 text-micro는 사용할 수 없습니다.",
      },
      {
        filePath: "Typography.tsx",
        line: 2,
        value: "text-[3rem]",
        reason: "font size는 Tailwind 표준 단계로 지정해야 합니다.",
      },
    ]);
  });

  it("CSS에 직접 입력한 px, rem, clamp font size를 보고한다", () => {
    const source = "font-size: 14px;\nfont-size: 1rem;\nfont-size: clamp(1rem, 2vw, 2rem);";

    expect(findTypographyViolations("globals.css", source)).toHaveLength(3);
  });
});
