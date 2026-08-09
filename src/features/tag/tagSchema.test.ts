import { describe, expect, it } from "vitest";

import { TAG_KEYS_SCHEMA } from "./tagSchema";

describe("TAG_KEYS_SCHEMA", () => {
  it("등록된 canonical key를 허용한다", () => {
    expect(TAG_KEYS_SCHEMA.parse(["github-pages", "mdx"])).toEqual(["github-pages", "mdx"]);
  });

  it("등록되지 않거나 중복된 key를 거부한다", () => {
    expect(() => TAG_KEYS_SCHEMA.parse(["GitHub Pages"])).toThrow("Unknown tag");
    expect(() => TAG_KEYS_SCHEMA.parse(["seo", "seo"])).toThrow("Tags must be unique");
  });
});
