import Link from "next/link";

import { Container } from "@/shared/ui/Container";

const FOUNDATIONS = [
  ["01", "읽기 중심", "고정 사이드바와 불필요한 카드를 걷어냅니다."],
  ["02", "콘텐츠 우선", "기존 MDX와 검색 자산은 보존하고 표현 계층만 다시 만듭니다."],
  ["03", "예측 가능한 갱신", "서비스 워커 캐시 없이 정적 자산과 HTTP 캐시만 사용합니다."],
] as const;

export default function HomePage() {
  return (
    <Container className="py-16 md:py-24">
      <section className="max-w-[860px] py-8 md:py-14">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-accent">
          Bluemiv Tech Blog · V2
        </p>
        <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.055em] md:text-7xl">
          배운 것을 오래 남기는 기술 기록.
        </h1>
        <p className="mt-7 max-w-[680px] text-lg leading-8 text-muted md:text-xl md:leading-9">
          Java, Spring, React, Next.js를 다루며 만난 문제와 해결 과정을 읽기 좋은 형태로
          정리합니다.
        </p>
        <Link
          href="/articles"
          className="mt-9 inline-flex border-b border-foreground pb-1 text-sm font-bold transition-colors hover:border-accent hover:text-accent"
        >
          글 보러 가기 →
        </Link>
      </section>

      <section className="mt-20 border-t border-border" aria-labelledby="foundation-title">
        <div className="grid gap-4 py-7 md:grid-cols-[1fr_2fr]">
          <h2 id="foundation-title" className="text-sm font-bold">
            V2 Foundation
          </h2>
          <p className="max-w-[620px] text-sm leading-7 text-muted">
            장식보다 정보 계층, 타이포그래피, 여백을 먼저 설계합니다.
          </p>
        </div>
        <ol>
          {FOUNDATIONS.map(([number, title, description]) => (
            <li
              key={number}
              className="grid gap-3 border-t border-border py-7 md:grid-cols-[1fr_1fr_2fr] md:items-baseline"
            >
              <span className="font-mono text-xs text-muted">{number}</span>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm leading-7 text-muted">{description}</p>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
