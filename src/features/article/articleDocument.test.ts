import { describe, expect, it } from "vitest";

import { extractArticleHeadings, getArticleReadingTime } from "./articleDocument";

describe("articleDocument", () => {
  it("h2와 h3만 TOC heading으로 변환하고 중복 id를 구분한다", () => {
    const source = `# 제외
## 설치하기
### [설정](https://example.com) \`옵션\`
#### 제외
## 설치하기
`;

    expect(extractArticleHeadings(source)).toEqual([
      { id: "설치하기", title: "설치하기", depth: 2 },
      { id: "설정-옵션", title: "설정 옵션", depth: 3 },
      { id: "설치하기-1", title: "설치하기", depth: 2 },
    ]);
  });

  it("code fence 내부 heading을 TOC에서 제외한다", () => {
    const source = `## 실제 제목
\`\`\`markdown
~~~
## 코드 예시
\`\`\`
~~~text
### 또 다른 코드 예시
~~~
## ** **
`;

    expect(extractArticleHeadings(source)).toEqual([
      { id: "실제-제목", title: "실제 제목", depth: 2 },
    ]);
  });

  it("한국어, 영문, code 분량을 합산해 읽기 시간을 계산한다", () => {
    const koreanSource = "가".repeat(501);
    const englishSource = Array.from({ length: 221 }, () => "word").join(" ");
    const codeSource = `\`\`\`typescript\n${Array.from({ length: 13 }, () => "const x = 1;").join("\n")}\n\`\`\``;

    expect(getArticleReadingTime("짧은 글")).toBe(1);
    expect(getArticleReadingTime(koreanSource)).toBe(2);
    expect(getArticleReadingTime(englishSource)).toBe(2);
    expect(getArticleReadingTime(codeSource)).toBe(2);
  });
});
