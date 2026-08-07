import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/shared/ui/Container";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const LATEST_POSTS = [
  {
    number: "01",
    category: "Kotlin",
    title: "Kotlin이란?",
    description:
      "Java 생태계를 활용하면서 더 간결하고 안전하게 코드를 작성하는 언어를 살펴봅니다.",
    date: "2025.12.28",
    dateTime: "2025-12-28",
  },
  {
    number: "02",
    category: "Java",
    title: "POJO(Plain Old Java Object)란?",
    description:
      "프레임워크에 종속되지 않는 객체와 Spring에서의 활용 방식을 정리합니다.",
    date: "2025.12.26",
    dateTime: "2025-12-26",
  },
  {
    number: "03",
    category: "Spring",
    title: "@RequestParam과 @PathVariable 사용법",
    description:
      "Query string과 경로 변수를 구분하고 선택하는 기준을 알아봅니다.",
    date: "2025.09.04",
    dateTime: "2025-09-04",
  },
  {
    number: "04",
    category: "Spring",
    title: "HTTP 메서드와 매핑 어노테이션",
    description:
      "REST API의 HTTP 메서드와 Spring 매핑 어노테이션을 연결합니다.",
    date: "2025.09.01",
    dateTime: "2025-09-01",
  },
] as const;

const NOTES = [
  ["02", "기술 선택에서 익숙함과 적합함 구분하기"],
  ["01", "블로그를 다시 만드는 이유"],
] as const;

export default function HomePage() {
  return (
    <>
      <section className="border-border relative overflow-hidden border-b">
        <div
          className="blueprint-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <Container className="relative grid min-h-[560px] gap-10 py-14 md:grid-cols-[minmax(0,1fr)_240px] md:items-end md:py-16">
          <div className="max-w-[820px]">
            <div className="text-accent mb-8 flex items-center gap-3 text-xs font-bold tracking-[0.18em] uppercase">
              <span className="bg-accent h-px w-10" />
              Software · Architecture · Learning
            </div>
            <h1 className="text-5xl leading-[1.06] font-semibold tracking-[-0.055em] text-balance md:text-7xl lg:text-[88px]">
              기술을 익히고,
              <br />
              문제를 풀고,
              <br />
              <span className="font-display text-accent font-normal italic">
                기록
              </span>
              으로 남깁니다.
            </h1>
            <p className="text-muted mt-9 max-w-[660px] text-base leading-8 md:text-lg md:leading-9">
              Java, Spring, React, Next.js를 다루며 만난 문제와 선택의 이유를
              오래 읽을 수 있는 기술 기록으로 정리합니다.
            </p>
          </div>

          <aside className="border-border text-subtle border-l pl-5 font-mono text-[11px] leading-6 md:mb-2">
            <dl className="grid grid-cols-[72px_1fr]">
              <dt>EDITION</dt>
              <dd className="text-foreground">V2 / 2026</dd>
              <dt>FORMAT</dt>
              <dd className="text-foreground">STATIC</dd>
              <dt>LOCATION</dt>
              <dd className="text-foreground">SEOUL, KR</dd>
              <dt>STATUS</dt>
              <dd className="text-accent">● WRITING</dd>
            </dl>
          </aside>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        <section aria-labelledby="featured-title">
          <div className="border-border mb-8 flex items-end justify-between border-b pb-4">
            <div>
              <p className="text-accent font-mono text-[10px] tracking-[0.16em] uppercase">
                Featured / 01
              </p>
              <h2
                id="featured-title"
                className="mt-2 text-sm font-bold tracking-[0.08em] uppercase"
              >
                최근 기록
              </h2>
            </div>
            <span className="text-subtle hidden font-mono text-[10px] sm:block">
              UPDATED 2025.12.28
            </span>
          </div>

          <Link
            href="/articles"
            className="group border-border grid gap-8 border-b pb-14 md:grid-cols-[1fr_1.1fr] md:items-stretch"
          >
            <div className="border-border bg-accent-soft relative min-h-[280px] overflow-hidden border p-7 md:min-h-[360px]">
              <div
                className="blueprint-grid absolute inset-0"
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col justify-between">
                <span className="text-accent font-mono text-xs">
                  LANG / JVM / 087
                </span>
                <div>
                  <span className="font-display text-accent block text-7xl italic md:text-8xl">
                    K
                  </span>
                  <span className="text-muted font-mono text-xs tracking-[0.18em] uppercase">
                    Kotlin
                  </span>
                </div>
              </div>
            </div>
            <article className="flex flex-col justify-center py-2 md:px-8">
              <p className="text-muted font-mono text-xs">
                2025.12.28 · 8 MIN READ
              </p>
              <h3 className="group-hover:text-accent mt-5 text-4xl font-semibold tracking-[-0.045em] transition-colors md:text-6xl">
                Kotlin이란?
              </h3>
              <p className="text-muted mt-6 max-w-[560px] text-base leading-8">
                Kotlin이 어떤 언어인지, 어디에 사용되는지, Java와 비교했을 때
                기본 문법은 어떻게 다른지 정리합니다.
              </p>
              <div className="text-subtle mt-9 flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                <span>#Kotlin</span>
                <span>#JVM</span>
                <span>#Java</span>
              </div>
              <span className="text-accent mt-10 text-sm font-bold">
                글 읽기 ↗
              </span>
            </article>
          </Link>
        </section>

        <section className="mt-24" aria-labelledby="latest-title">
          <div className="border-border grid gap-4 border-b pb-5 md:grid-cols-[1fr_2fr]">
            <h2
              id="latest-title"
              className="text-sm font-bold tracking-[0.08em] uppercase"
            >
              Latest Articles
            </h2>
            <div className="flex items-center justify-between gap-4">
              <p className="text-muted text-sm">최근 정리한 개발 기록</p>
              <Link
                className="text-accent hover:text-accent-hover text-xs font-bold"
                href="/articles"
              >
                전체 보기 →
              </Link>
            </div>
          </div>

          <ol>
            {LATEST_POSTS.map((post) => (
              <li key={post.number} className="border-border border-b">
                <Link
                  href="/articles"
                  className="group hover:bg-surface grid gap-3 py-7 transition-colors md:grid-cols-[56px_120px_minmax(0,1fr)_100px_24px] md:items-start md:px-3"
                >
                  <span className="text-subtle font-mono text-xs">
                    {post.number}
                  </span>
                  <span className="text-accent font-mono text-xs uppercase">
                    {post.category}
                  </span>
                  <span>
                    <strong className="group-hover:text-accent block text-lg font-semibold tracking-[-0.02em] transition-colors md:text-xl">
                      {post.title}
                    </strong>
                    <span className="text-muted mt-2 block max-w-[620px] text-sm leading-6">
                      {post.description}
                    </span>
                  </span>
                  <time
                    dateTime={post.dateTime}
                    className="text-subtle font-mono text-[11px]"
                  >
                    {post.date}
                  </time>
                  <span className="hidden transition-transform group-hover:translate-x-1 md:block">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      <section className="bg-foreground text-canvas py-16 md:py-20">
        <Container className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-blueprint-400 font-mono text-[10px] tracking-[0.16em] uppercase">
              Short Notes
            </p>
            <h2 className="font-display mt-4 text-4xl italic md:text-5xl">
              짧게 남긴 생각.
            </h2>
          </div>
          <ol className="border-canvas/25 border-t">
            {NOTES.map(([number, title]) => (
              <li key={number} className="border-canvas/25 border-b">
                <Link
                  href="/notes"
                  className="group grid grid-cols-[48px_1fr_24px] gap-4 py-6 text-sm md:text-base"
                >
                  <span className="text-blueprint-400 font-mono text-xs">
                    N{number}
                  </span>
                  <span>{title}</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
