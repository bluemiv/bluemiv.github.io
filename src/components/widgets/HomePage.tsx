import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const copy = HOME_COPY[locale];
  const articlesHref = getLocalizedPath(locale, "articles");
  const notesHref = getLocalizedPath(locale, "notes");

  return (
    <>
      <section className="border-border relative overflow-hidden border-b">
        <div
          className="blueprint-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <Container className="relative grid min-h-[560px] gap-12 py-14 md:grid-cols-[minmax(0,1fr)_240px] md:items-end md:py-16">
          <div className="max-w-[820px]">
            <p className="text-accent mb-8 flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase md:text-xs">
              <span className="bg-accent h-px w-10" />
              {copy.hero.eyebrow}
            </p>
            <h1 className="text-[50px] leading-[1.06] font-semibold tracking-[-0.055em] text-balance md:text-7xl lg:text-[82px]">
              {copy.hero.lineOne}
              <br />
              {copy.hero.lineTwo}
              <br />
              {copy.hero.lineThreePrefix}
              <span className="font-display text-accent font-normal">
                {copy.hero.accent}
              </span>
              {copy.hero.lineThreeSuffix}
            </h1>
            <p className="text-muted mt-8 max-w-[660px] text-base leading-8 md:text-lg md:leading-9">
              {copy.hero.description}
            </p>
            <Link
              className="text-accent hover:text-accent-hover mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold transition-colors"
              href={`${getLocalizedPath(locale)}#latest-articles`}
            >
              {copy.hero.cta}
              <span aria-hidden="true">↓</span>
            </Link>
          </div>

          <aside className="border-border text-subtle border-l pl-5 font-mono text-[10px] leading-6 md:mb-2 md:text-[11px]">
            <dl className="grid grid-cols-[72px_1fr]">
              <dt>EDITION</dt>
              <dd className="text-foreground">V2 / 2026</dd>
              <dt>FORMAT</dt>
              <dd className="text-foreground">STATIC</dd>
              <dt>LOCATION</dt>
              <dd className="text-foreground">SEOUL, KR</dd>
              <dt>{copy.hero.statusLabel.toUpperCase()}</dt>
              <dd className="text-accent">● {copy.hero.status}</dd>
            </dl>
          </aside>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        <section aria-labelledby="featured-title">
          <div className="border-border mb-8 flex items-end justify-between border-b pb-4">
            <div>
              <p className="text-accent font-mono text-[10px] tracking-[0.16em] uppercase">
                {copy.featured.eyebrow}
              </p>
              <h2
                id="featured-title"
                className="mt-2 text-sm font-bold tracking-[0.08em] uppercase"
              >
                {copy.featured.heading}
              </h2>
            </div>
            <span className="text-subtle hidden font-mono text-[10px] uppercase sm:block">
              {copy.featured.updated}
            </span>
          </div>

          <Link
            href={articlesHref}
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
                  <span className="font-display text-accent block text-7xl md:text-8xl">
                    K
                  </span>
                  <span className="text-muted font-mono text-xs tracking-[0.18em] uppercase">
                    {copy.featured.topic}
                  </span>
                </div>
              </div>
            </div>
            <article className="flex flex-col justify-center py-2 md:px-8">
              <p className="text-muted font-mono text-xs uppercase">
                2025.12.28 · {copy.featured.readTime}
              </p>
              <h3 className="group-hover:text-accent mt-5 text-4xl font-semibold tracking-[-0.045em] transition-colors md:text-6xl">
                {copy.featured.title}
              </h3>
              <p className="text-muted mt-6 max-w-[560px] text-base leading-8">
                {copy.featured.description}
              </p>
              <div className="text-subtle mt-9 flex flex-wrap gap-3 font-mono text-[10px] uppercase">
                <span>#Kotlin</span>
                <span>#JVM</span>
                <span>#Java</span>
              </div>
              <span className="text-accent mt-9 text-sm font-bold">
                {copy.featured.action} →
              </span>
            </article>
          </Link>
        </section>

        <section
          id="latest-articles"
          className="mt-24 scroll-mt-24"
          aria-labelledby="latest-title"
        >
          <div className="border-border grid gap-4 border-b pb-5 md:grid-cols-[1fr_2fr]">
            <h2
              id="latest-title"
              className="text-sm font-bold tracking-[0.08em] uppercase"
            >
              {copy.latest.heading}
            </h2>
            <div className="flex items-center justify-between gap-4">
              <p className="text-muted text-sm">{copy.latest.description}</p>
              <Link
                className="text-accent hover:text-accent-hover inline-flex min-h-11 shrink-0 items-center text-xs font-bold transition-colors"
                href={articlesHref}
              >
                {copy.latest.action} →
              </Link>
            </div>
          </div>

          <ol>
            {copy.latest.articles.map((article) => (
              <li key={article.number} className="border-border border-b">
                <Link
                  href={articlesHref}
                  className="group hover:bg-surface grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-2 py-7 transition-colors md:grid-cols-[56px_120px_minmax(0,1fr)_100px] md:items-start md:px-3"
                >
                  <span className="text-subtle font-mono text-xs">
                    {article.number}
                  </span>
                  <span className="text-accent font-mono text-xs uppercase">
                    {article.topic}
                  </span>
                  <span className="col-start-2 md:col-start-3 md:row-start-1">
                    <strong className="group-hover:text-accent block text-lg font-semibold tracking-[-0.02em] transition-colors md:text-xl">
                      {article.title}
                    </strong>
                    <span className="text-muted mt-2 line-clamp-2 block max-w-[620px] text-sm leading-6">
                      {article.description}
                    </span>
                  </span>
                  <time
                    dateTime={article.dateTime}
                    className="text-subtle col-start-2 font-mono text-[10px] md:col-start-4 md:row-start-1 md:text-[11px]"
                  >
                    {article.date}
                  </time>
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
              {copy.notes.eyebrow}
            </p>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">
              {copy.notes.heading}
            </h2>
            <Link
              href={notesHref}
              className="text-blueprint-400 mt-6 inline-flex min-h-11 items-center text-xs font-bold"
            >
              {copy.notes.action} →
            </Link>
          </div>
          <ol className="border-canvas/25 border-t">
            {copy.notes.items.map(([number, title]) => (
              <li key={number} className="border-canvas/25 border-b">
                <Link
                  href={notesHref}
                  className="group grid min-h-20 grid-cols-[48px_1fr_24px] items-center gap-4 py-4 text-sm md:text-base"
                >
                  <span className="text-blueprint-400 font-mono text-xs">
                    N{number}
                  </span>
                  <span>{title}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
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
