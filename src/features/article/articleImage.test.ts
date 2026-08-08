import { describe, expect, it } from "vitest";

import { getArticleImageDimensions } from "./articleImage";

describe("articleImage", () => {
  it("public article 이미지의 실제 크기를 읽는다", () => {
    expect(getArticleImageDimensions("/r/i/nextjs/1/thumbnail.webp")).toEqual({
      width: 1600,
      height: 850,
    });
  });

  it.each(["https://example.com/image.webp", "/outside/image.webp", "/r/i/../private.webp"])(
    "허용 범위 밖의 경로를 거부한다: %s",
    (sourcePath) => {
      expect(() => getArticleImageDimensions(sourcePath)).toThrow("Unsupported article image path");
    },
  );

  it("존재하지 않는 article 이미지를 거부한다", () => {
    expect(() => getArticleImageDimensions("/r/i/nextjs/1/missing.webp")).toThrow(
      "Article image not found",
    );
  });
});
