import { describe, expect, it } from "vitest";

import { addMigrationMetadata, normalizeMetadataNames } from "./migrationMetadata.mjs";

const SOURCE_MDX = `---
title: 예전 글
createdAt: 2025-01-01T00:00:00+09:00
updatedAt: 2025-01-02T00:00:00+09:00
release: true
author: Legacy Author
thumbnail: /r/i/1/thumbnail.webp
---

createdAt: 본문은 바꾸면 안 됨
`;

describe("migrationMetadata", () => {
  it("이관 metadata를 frontmatter 첫 부분에 추가한다", () => {
    const migrated = addMigrationMetadata(SOURCE_MDX, ["id: article-001", "slug: example-article"]);

    expect(migrated).toMatch(/^---\nid: article-001\nslug: example-article\ntitle:/);
  });

  it("과거 metadata 이름만 표준 이름으로 변환한다", () => {
    const migrated = normalizeMetadataNames(SOURCE_MDX);

    expect(migrated).toContain("publishedAt: 2025-01-01T00:00:00+09:00");
    expect(migrated).toContain("modifiedAt: 2025-01-02T00:00:00+09:00");
    expect(migrated).toContain("isPublished: true");
    expect(migrated).toContain("coverImage: /r/i/1/thumbnail.webp");
    expect(migrated).not.toContain("author: Legacy Author");
  });

  it("본문은 byte 단위로 유지한다", () => {
    const migrated = normalizeMetadataNames(SOURCE_MDX);
    const sourceBody = SOURCE_MDX.split("---\n").at(-1);
    const migratedBody = migrated.split("---\n").at(-1);

    expect(migratedBody).toBe(sourceBody);
    expect(migratedBody).toContain("createdAt: 본문은 바꾸면 안 됨");
  });

  it("frontmatter가 없으면 이관을 거부한다", () => {
    expect(() => addMigrationMetadata("본문만 있음", ["id: article-001"])).toThrow(
      "Frontmatter must start on the first line",
    );
    expect(() => normalizeMetadataNames("본문만 있음")).toThrow(
      "Frontmatter must start on the first line",
    );
  });
});
