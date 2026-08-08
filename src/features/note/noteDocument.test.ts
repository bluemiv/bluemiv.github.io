import { describe, expect, it } from "vitest";

import { extractNoteHeadings, shouldShowNoteTableOfContents } from "./noteDocument";

describe("noteDocument", () => {
  it("h2만 추출하고 기존 번호는 label에서 제거한다", () => {
    const source = `# 제외
## 1. 시작하기
### 제외
## [설정](https://example.com) \`옵션\`
## 시작하기
`;

    expect(extractNoteHeadings(source)).toEqual([
      { id: "1-시작하기", number: "01", title: "시작하기" },
      { id: "설정-옵션", number: "02", title: "설정 옵션" },
      { id: "시작하기", number: "03", title: "시작하기" },
    ]);
  });

  it("code fence 내부 heading과 빈 heading을 제외한다", () => {
    const source = `## 실제 제목
\`\`\`\`markdown
~~~
## 코드 예시
\`\`\`
\`\`\`\`
~~~text
## 또 다른 코드 예시
~~~
## ** **
`;

    expect(extractNoteHeadings(source)).toEqual([
      { id: "실제-제목", number: "01", title: "실제 제목" },
    ]);
  });

  it("h2가 3개 이상일 때만 TOC를 표시한다", () => {
    const headings = extractNoteHeadings("## 하나\n## 둘\n## 셋");

    expect(shouldShowNoteTableOfContents(headings.slice(0, 2))).toBe(false);
    expect(shouldShowNoteTableOfContents(headings)).toBe(true);
  });
});
