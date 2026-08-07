import { describe, expect, it } from "vitest";

import { inferPolicyLocale, sanitizePolicyHtml } from "./policyMigration.mjs";

describe("policyMigration", () => {
  it("main 내부의 의미 구조와 안전한 링크만 남긴다", () => {
    const result = sanitizePolicyHtml(`
      <main class="old" style="color:red">
        <section class="card"><h1>Policy</h1>
          <p onclick="alert(1)">Hello <span class="old">world</span><!-- --></p>
          <a class="old" href="/privacy/demo/en" target="_blank" rel="noreferrer">English</a>
          <a href="https://example.com/privacy">External</a>
          <a href="javascript:alert(1)">Unsafe</a>
          <svg><path d="x"></path></svg><img src="/private.png">
        </section>
      </main>
    `);

    expect(result).toContain("<section><h1>Policy</h1>");
    expect(result).toContain("Hello <span>world</span>");
    expect(result).toContain('href="/privacy/demo/en/"');
    expect(result).toContain('href="https://example.com/privacy"');
    expect(result).not.toMatch(/class=|style=|onclick=|javascript:|<svg|<img|<!--/);
  });

  it("공개 문서에서 실명과 개인 전화번호를 제거한다", () => {
    const result = sanitizePolicyHtml(`
      <main><p>홍길동 (직책/직급: 없음), 홍길동, Jane Doe (no formal title/position)</p>
      <p>Contact: +82-10-1234-5678, public.legacy@gmail.com</p>
      <p>{appName}</p><ul><li>전화: +82-10-1234-5678</li></ul></main>
    `);

    expect(result).toContain("Bluemiv");
    expect(result).toContain("public.bluemiv@gmail.com");
    expect(result).toContain("KPOP Clip");
    expect(result).not.toMatch(/홍길동|Jane Doe|1234-5678|public\.legacy/);
    expect(result).not.toContain("<li>전화: </li>");
  });

  it("main이 없으면 이관을 중단한다", () => {
    expect(() => sanitizePolicyHtml("<article>Policy</article>")).toThrow(
      "Policy source must contain one main element",
    );
  });

  it.each([
    ["/apps/demo/privacy/", "ko"],
    ["/apps/demo/privacy/en/", "en"],
    ["/apps/demo/privacy/jp/", "ja"],
    ["/privacy/demo/cn/", "zh-CN"],
  ])("%s 경로 locale을 %s로 판별한다", (routePath, locale) => {
    expect(inferPolicyLocale(routePath)).toBe(locale);
  });
});
