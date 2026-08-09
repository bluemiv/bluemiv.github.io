import { ViewTransition } from "react";

import Image from "next/image";
import Link from "next/link";

import { SectionHeader } from "@/components/atoms/SectionHeader";
import { getArticleNumber } from "@/features/article/articleIdentifier";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import { getArticleCategoryLabel, getArticleTopicLabel } from "@/features/article/articleTaxonomy";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { formatPublicationDate } from "@/features/i18n/publicationMetadata";
import type { HomeCopy } from "@/features/i18n/translations";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import { getTagLabel } from "@/features/tag/tagRegistry";

type PropsWithFeaturedArticle = {
  article: ArticleMetadata;
  copy: HomeCopy["featured"];
  locale: Locale;
  readingTimeMinutes: number | null;
};

function getArticleClassification(article: ArticleMetadata): string {
  return `${getArticleCategoryLabel(article.category)} / ${getArticleTopicLabel(article.topics[0])}`;
}

export function FeaturedArticle({
  article,
  copy,
  locale,
  readingTimeMinutes,
}: PropsWithFeaturedArticle) {
  const articleNumber = getArticleNumber(article.id);
  const classification = getArticleClassification(article);

  return (
    <section aria-labelledby="featured-title">
      <SectionHeader
        className="mb-8"
        eyebrow={copy.eyebrow}
        heading={copy.heading}
        headingId="featured-title"
        trailing={
          <time
            dateTime={article.publishedAt}
            className="text-muted hidden font-mono text-xs tabular-nums sm:block"
          >
            {formatPublicationDate(article.publishedAt, locale)}
          </time>
        }
      />

      <article>
        <Link
          href={getLocalizedPath(locale, `articles/${article.slug}`)}
          transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
          className="group border-border grid gap-8 border-b pb-14 md:grid-cols-[1fr_1.1fr] md:items-stretch"
        >
          <ViewTransition name={`article-cover-${article.id}`} default="none" share="article-cover">
            <div className="home-featured-cover-reveal border-border bg-accent-soft relative aspect-[32/17] overflow-hidden border md:self-center">
              {article.coverImage ? (
                <Image
                  fill
                  sizes="(min-width: 1184px) 520px, (min-width: 768px) 44vw, calc(100vw - 40px)"
                  src={article.coverImage}
                  alt=""
                  className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.01] motion-reduce:transition-none"
                />
              ) : (
                <div className="relative h-full p-6 md:p-8">
                  <div className="blueprint-grid absolute inset-0" aria-hidden="true" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-4 font-mono text-xs font-semibold tracking-[0.1em] uppercase">
                      <span className="text-accent">{classification}</span>
                      <span className="text-muted">A{articleNumber}</span>
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <span className="font-display text-accent text-7xl leading-none font-normal tracking-[-0.07em] sm:text-8xl lg:text-9xl">
                        {articleNumber}
                      </span>
                      <span className="text-muted mb-2 hidden max-w-24 text-right font-mono text-xs leading-4 tracking-[0.1em] uppercase sm:block">
                        Filed in
                        <br />
                        {classification}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ViewTransition>

          <div className="flex flex-col justify-center py-1 md:px-7">
            <p className="text-muted font-mono text-xs tracking-[0.06em] uppercase">
              {classification}
              {readingTimeMinutes ? ` · ${readingTimeMinutes} ${copy.readTimeSuffix}` : ""}
            </p>
            <h3 className="group-hover:text-accent mt-5 text-3xl leading-[1.2] font-semibold tracking-[-0.045em] text-balance transition-colors duration-150 motion-reduce:transition-none md:text-4xl lg:text-5xl">
              {article.title}
            </h3>
            <p className="text-muted mt-6 max-w-[560px] text-base leading-8">
              {article.description}
            </p>
            <div className="text-muted mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag}>#{getTagLabel(tag)}</span>
              ))}
            </div>
            <span className="text-accent mt-8 inline-flex items-center gap-2 text-sm font-bold">
              {copy.action}
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
  );
}
