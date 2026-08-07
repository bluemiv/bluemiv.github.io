import { describe, expect, it } from "vitest";

import { ADSENSE_CONFIG, isAdSenseEnabled } from "./adSenseConfig";

describe("adSenseConfig", () => {
  it("production build에서만 광고를 활성화한다", () => {
    expect(isAdSenseEnabled("production")).toBe(true);
  });

  it.each(["development", "test", "preview", undefined])(
    "운영 외 환경에서 광고를 비활성화한다: %s",
    (nodeEnv) => {
      expect(isAdSenseEnabled(nodeEnv)).toBe(false);
    },
  );

  it("test 환경의 실제 config도 광고를 비활성화한다", () => {
    expect(ADSENSE_CONFIG.enabled).toBe(false);
  });
});
