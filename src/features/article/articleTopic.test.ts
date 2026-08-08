import { describe, expect, it } from "vitest";

import { getArticleTopicLabel } from "./articleTopic";

describe("articleTopic", () => {
  it("등록된 topic을 공개 label로 변환한다", () => {
    expect(getArticleTopicLabel("nextjs")).toBe("Next.js");
    expect(getArticleTopicLabel("javascript")).toBe("JavaScript");
  });

  it("등록되지 않은 topic은 kebab-case를 읽을 수 있는 label로 변환한다", () => {
    expect(getArticleTopicLabel("web-performance")).toBe("web performance");
  });
});
