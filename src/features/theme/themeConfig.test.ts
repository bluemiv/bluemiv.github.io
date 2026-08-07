import vm from "node:vm";

import { describe, expect, it, vi } from "vitest";

import { getThemeInitializerScript, isTheme, resolveTheme } from "./themeConfig";

describe("themeConfig", () => {
  it.each(["light", "dark"])("저장 가능한 theme을 판별한다: %s", (theme) => {
    expect(isTheme(theme)).toBe(true);
  });

  it.each([null, "system", "", "DARK"])("잘못된 theme을 거부한다: %s", (theme) => {
    expect(isTheme(theme)).toBe(false);
  });

  it("사용자 저장값을 OS 설정보다 우선한다", () => {
    expect(resolveTheme("dark", false)).toBe("dark");
    expect(resolveTheme("light", true)).toBe("light");
  });

  it("저장값이 없거나 잘못되면 OS 설정을 사용한다", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
    expect(resolveTheme("invalid", true)).toBe("dark");
  });

  it.each([
    ["dark", false, true],
    ["light", true, false],
    [null, true, true],
    [null, false, false],
    ["invalid", true, true],
  ] as const)(
    "초기화 script도 같은 theme 규칙을 적용한다",
    (storedTheme, prefersDark, expected) => {
      const toggle = vi.fn();

      vm.runInNewContext(getThemeInitializerScript(), {
        localStorage: { getItem: () => storedTheme },
        window: { matchMedia: () => ({ matches: prefersDark }) },
        document: { documentElement: { classList: { toggle } } },
      });

      expect(toggle).toHaveBeenCalledWith("dark", expected);
    },
  );

  it("storage 접근 실패가 초기 렌더링을 막지 않는다", () => {
    expect(() =>
      vm.runInNewContext(getThemeInitializerScript(), {
        localStorage: {
          getItem: () => {
            throw new Error("blocked");
          },
        },
      }),
    ).not.toThrow();
  });
});
