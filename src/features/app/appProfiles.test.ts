import { describe, expect, it } from "vitest";

import { getAppProfile, getAppProfiles } from "./appProfiles";

describe("appProfiles", () => {
  it("기존 개별 app 경로를 고유하게 유지한다", () => {
    const profiles = getAppProfiles();
    expect(profiles).toHaveLength(2);
    expect(new Set(profiles.map(({ slug }) => slug)).size).toBe(2);
  });

  it("slug로 app 정보를 찾는다", () => {
    expect(getAppProfile("lottocat645")?.locale).toBe("ko");
    expect(getAppProfile("missing")).toBeUndefined();
  });
});
