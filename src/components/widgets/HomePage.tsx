import { ViewTransition } from "react";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { ArticleListRow } from "@/components/widgets/ArticleListRow";
import {
  ArticleTaxonomyNavigation,
  MobileArticleTaxonomyNavigation,
} from "@/components/widgets/ArticleTaxonomyNavigation";
import { PageTransition } from "@/components/widgets/PageTransition";
import { SITE_CONFIG } from "@/config/siteConfig";
import { AdSenseScript } from "@/features/adsense/AdSenseScript";
import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import { selectHomeArticles, summarizeArticleTaxonomy } from "@/features/article/articleCollection";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import { getArticleDocument, getPublishedArticles } from "@/features/article/articleRepository";
import { getArticleCategoryLabel, getArticleTopicLabel } from "@/features/article/articleTaxonomy";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { formatPublicationDate } from "@/features/i18n/publicationMetadata";
import { HOME_COPY } from "@/features/i18n/translations";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import type { NoteMetadata } from "@/features/note/noteMetadata";
import { getPublishedNotes } from "@/features/note/noteRepository";
import { calculateCareerMonthOrdinal, formatYearMonth } from "@/features/profile/careerDuration";

type PropsWithHomePage = {
  locale: Locale;
};

function getEntryNumber(id: string): string {
  return id.split("-").at(-1)?.padStart(3, "0") ?? "000";
}

function getArticleClassification(article: ArticleMetadata): string {
  return `${getArticleCategoryLabel(article.category)} / ${getArticleTopicLabel(article.topics[0])}`;
}

function getNoteHref(locale: Locale, note: NoteMetadata): string {
  return getLocalizedPath(locale, `notes/${note.slug}`);
}

export function HomePage({ locale }: PropsWithHomePage) {
  const copy = HOME_COPY[locale];
  const articles = getPublishedArticles(locale);
  const notes = getPublishedNotes(locale);
  const { featuredArticle, latestArticles } = selectHomeArticles(articles);
  const taxonomy = summarizeArticleTaxonomy(articles);
  const topicCount = taxonomy.reduce((count, category) => count + category.topics.length, 0);
  const featuredDocument = featuredArticle
    ? getArticleDocument(featuredArticle.slug, locale)
    : null;
  const articlesHref = getLocalizedPath(locale, "articles");
  const notesHref = getLocalizedPath(locale, "notes");
  const hasArticles = articles.length > 0;
  const hasNotes = notes.length > 0;
  const showHomeAd = locale === "ko" && latestArticles.length >= 4;
  const careerMonthOrdinal = calculateCareerMonthOrdinal(
    SITE_CONFIG.careerStartMonth,
    formatYearMonth(new Date(), SITE_CONFIG.timeZone),
  );

  return (
    <PageTransition>
      {showHomeAd ? <AdSenseScript /> : null}

      <section className="border-border relative overflow-hidden border-b">
        <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid min-h-[460px] gap-8 py-10 md:min-h-[500px] md:py-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
          <div className="max-w-[820px]">
            <p className="text-accent mb-6 flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.16em] uppercase">
              <span className="bg-accent h-px w-10" />
              {copy.hero.eyebrow}
            </p>
            <h1 className="text-5xl leading-[1.07] font-semibold tracking-[-0.055em] text-balance sm:text-6xl md:text-7xl">
              {copy.hero.lineOne}
              <br />
              {copy.hero.lineTwo}
              <br />
              {copy.hero.lineThreePrefix}
              <span className="font-display text-accent font-normal">{copy.hero.accent}</span>
              {copy.hero.lineThreeSuffix}
            </h1>
            <p className="text-muted mt-6 max-w-[650px] text-base leading-8 md:text-lg md:leading-9">
              {copy.hero.description(careerMonthOrdinal)}
            </p>
            {hasArticles ? (
              <a
                className="text-accent hover:text-accent-hover mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold transition-colors duration-150 motion-reduce:transition-none"
                href="#latest-articles"
              >
                {copy.hero.cta}
                <span aria-hidden="true">↓</span>
              </a>
            ) : null}
          </div>

          <aside className="border-border text-muted border-t pt-5 font-mono text-xs leading-6 lg:mb-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
            <dl className="grid grid-cols-4 gap-x-2 lg:grid-cols-[88px_1fr] lg:gap-x-0">
              <div className="lg:contents">
                <dt>{copy.hero.articleCountLabel.toUpperCase()}</dt>
                <dd className="text-foreground tabular-nums">
                  {String(articles.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="lg:contents">
                <dt>{copy.hero.topicCountLabel.toUpperCase()}</dt>
                <dd className="text-foreground tabular-nums">
                  {String(topicCount).padStart(2, "0")}
                </dd>
              </div>
              <div className="lg:contents">
                <dt>{copy.hero.noteCountLabel.toUpperCase()}</dt>
                <dd className="text-foreground tabular-nums">
                  {String(notes.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="lg:contents">
                <dt>{copy.hero.statusLabel.toUpperCase()}</dt>
                <dd className="text-accent">● {copy.hero.status}</dd>
              </div>
            </dl>
          </aside>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        {featuredArticle ? (
          <section aria-labelledby="featured-title">
            <div className="border-border mb-8 flex items-end justify-between border-b pb-4">
              <div>
                <p className="motion-section-marker text-accent font-mono text-xs tracking-[0.16em] uppercase">
                  {copy.featured.eyebrow}
                </p>
                <h2
                  id="featured-title"
                  className="mt-2 text-sm font-bold tracking-[0.08em] uppercase"
                >
                  {copy.featured.heading}
                </h2>
              </div>
              <time
                dateTime={featuredArticle.publishedAt}
                className="text-muted hidden font-mono text-xs tabular-nums sm:block"
              >
                {formatPublicationDate(featuredArticle.publishedAt, locale)}
              </time>
            </div>

            <article>
              <Link
                href={getLocalizedPath(locale, `articles/${featuredArticle.slug}`)}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
                className="group border-border grid gap-8 border-b pb-14 md:grid-cols-[1fr_1.1fr] md:items-stretch"
              >
                <ViewTransition
                  name={`article-cover-${featuredArticle.id}`}
                  default="none"
                  share="article-cover"
                >
                  <div className="home-featured-cover-reveal border-border bg-accent-soft relative aspect-[32/17] overflow-hidden border md:self-center">
                    {featuredArticle.coverImage ? (
                      <Image
                        fill
                        sizes="(min-width: 1184px) 520px, (min-width: 768px) 44vw, calc(100vw - 40px)"
                        src={featuredArticle.coverImage}
                        alt=""
                        className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.01] motion-reduce:transition-none"
                      />
                    ) : (
                      <div className="relative h-full p-6 md:p-8">
                        <div className="blueprint-grid absolute inset-0" aria-hidden="true" />
                        <div className="relative flex h-full flex-col justify-between">
                          <div className="flex items-start justify-between gap-4 font-mono text-xs font-semibold tracking-[0.1em] uppercase">
                            <span className="text-accent">
                              {getArticleClassification(featuredArticle)}
                            </span>
                            <span className="text-muted">
                              A{getEntryNumber(featuredArticle.id)}
                            </span>
                          </div>
                          <div className="flex items-end justify-between gap-4">
                            <span className="font-display text-accent text-7xl leading-none font-normal tracking-[-0.07em] sm:text-8xl lg:text-9xl">
                              {getEntryNumber(featuredArticle.id)}
                            </span>
                            <span className="text-muted mb-2 hidden max-w-24 text-right font-mono text-xs leading-4 tracking-[0.1em] uppercase sm:block">
                              Filed in
                              <br />
                              {getArticleClassification(featuredArticle)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ViewTransition>

                <div className="flex flex-col justify-center py-1 md:px-7">
                  <p className="text-muted font-mono text-xs tracking-[0.06em] uppercase">
                    {getArticleClassification(featuredArticle)}
                    {featuredDocument
                      ? ` · ${featuredDocument.readingTimeMinutes} ${copy.featured.readTimeSuffix}`
                      : ""}
                  </p>
                  <h3 className="group-hover:text-accent mt-5 text-3xl leading-[1.2] font-semibold tracking-[-0.045em] text-balance transition-colors duration-150 motion-reduce:transition-none md:text-4xl lg:text-5xl">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-muted mt-6 max-w-[560px] text-base leading-8">
                    {featuredArticle.description}
                  </p>
                  <div className="text-muted mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase">
                    {featuredArticle.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                  <span className="text-accent mt-8 inline-flex items-center gap-2 text-sm font-bold">
                    {copy.featured.action}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          </section>
        ) : null}

        <div
          id="latest-articles"
          className={`${featuredArticle ? "mt-20 md:mt-28" : ""} scroll-mt-24 ${taxonomy.length > 0 ? "xl:grid xl:grid-cols-[minmax(0,760px)_300px] xl:gap-[60px]" : "max-w-[760px]"}`}
        >
          <section aria-labelledby="latest-title">
            <div className="border-border grid gap-4 border-b pb-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="motion-section-marker text-accent font-mono text-xs tracking-[0.16em] uppercase">
                  {copy.latest.eyebrow}
                </p>
                <h2
                  id="latest-title"
                  className="mt-2 text-sm font-bold tracking-[0.08em] uppercase"
                >
                  {copy.latest.heading}
                </h2>
                <p className="text-muted mt-2 text-sm leading-6">{copy.latest.description}</p>
              </div>
              {hasArticles ? (
                <Link
                  className="text-accent hover:text-accent-hover inline-flex min-h-11 items-center text-sm font-bold transition-colors duration-150 motion-reduce:transition-none"
                  href={articlesHref}
                  transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
                >
                  {copy.latest.action} →
                </Link>
              ) : null}
            </div>

            {taxonomy.length > 0 ? (
              <MobileArticleTaxonomyNavigation
                activeCategory={null}
                activeTopic={null}
                heading={copy.topics.heading}
                isAllArticlesActive={false}
                locale={locale}
                taxonomy={taxonomy}
                totalArticleCount={articles.length}
                transitionDirection="forward"
              />
            ) : null}

            {latestArticles.length > 0 ? (
              <div>
                {latestArticles.map((article, index) => (
                  <div key={article.id}>
                    <ArticleListRow article={article} locale={locale} />
                    {showHomeAd && index === 2 ? (
                      <div className="xl:hidden">
                        <AdSenseSlot format="banner" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="border-border text-muted border-b py-14 text-sm leading-7">
                {copy.latest.empty}
              </p>
            )}
          </section>

          {taxonomy.length > 0 ? (
            <aside className="hidden xl:block" aria-label={copy.topics.heading}>
              <ArticleTaxonomyNavigation
                activeCategory={null}
                activeTopic={null}
                eyebrow={copy.topics.eyebrow}
                heading={copy.topics.heading}
                isAllArticlesActive={false}
                locale={locale}
                taxonomy={taxonomy}
                totalArticleCount={articles.length}
                transitionDirection="forward"
              />

              {showHomeAd ? (
                <div className="mt-12">
                  <AdSenseSlot format="sidebar" />
                </div>
              ) : null}
            </aside>
          ) : null}
        </div>
      </Container>

      {hasNotes ? (
        <section className="bg-foreground text-canvas py-16 md:py-20" aria-labelledby="notes-title">
          <Container className="grid gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-blueprint-400 font-mono text-xs tracking-[0.16em] uppercase">
                {copy.notes.eyebrow}
              </p>
              <h2 id="notes-title" className="font-display mt-4 text-4xl md:text-5xl">
                {copy.notes.heading}
              </h2>
              <p className="text-canvas/70 mt-4 max-w-sm text-sm leading-7">
                {copy.notes.description}
              </p>
              <Link
                href={notesHref}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
                className="text-blueprint-400 mt-5 inline-flex min-h-11 items-center text-sm font-bold"
              >
                {copy.notes.action} →
              </Link>
            </div>
            <ol className="border-canvas/25 border-t">
              {notes.slice(0, 3).map((note) => (
                <li key={note.id} className="border-canvas/25 border-b">
                  <Link
                    href={getNoteHref(locale, note)}
                    transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
                    className="group grid min-h-20 grid-cols-[48px_1fr_24px] items-center gap-4 py-4 text-sm md:text-base"
                  >
                    <span className="text-blueprint-400 font-mono text-xs">
                      N{getEntryNumber(note.id).slice(-2)}
                    </span>
                    <span>{note.title}</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}
    </PageTransition>
  );
}
