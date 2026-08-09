import { Fragment, ViewTransition } from "react";

import Image from "next/image";
import Link from "next/link";

import { PublicationMetadata } from "@/components/atoms/PublicationMetadata";
import { ArchiveBackLink } from "@/components/widgets/ArchiveBackLink";
import { getArticleNumber } from "@/features/article/articleIdentifier";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import { getArticleCategoryLabel, getArticleTopicLabel } from "@/features/article/articleTaxonomy";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import {
  formatApproximateReadingTime,
  formatPublicationDate,
} from "@/features/i18n/publicationMetadata";
import { ARTICLE_DETAIL_COPY, PUBLICATION_METADATA_COPY } from "@/features/i18n/translations";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArticleDetailHeader = {
  article: ArticleMetadata;
  readingTimeMinutes: number;
};

type PropsWithArticleHeaderContent = PropsWithArticleDetailHeader & {
  tone: "default" | "onMedia";
};

function ArticleHeaderContent({
  article,
  readingTimeMinutes,
  tone,
}: PropsWithArticleHeaderContent) {
  const hasModifiedDate = article.modifiedAt !== article.publishedAt;
  const publicationLabels = PUBLICATION_METADATA_COPY[article.locale];
  const articleNumber = getArticleNumber(article.id);
  const categoryLabel = getArticleCategoryLabel(article.category);
  const isOnMedia = tone === "onMedia";
  const hasTaxonomyArchives = article.locale === "ko";

  return (
    <>
      <div className="flex items-center gap-4">
        <span
          className={isOnMedia ? "bg-code-foreground/70 h-px w-8" : "bg-accent h-px w-8"}
          aria-hidden="true"
        />
        <p
          className={`font-mono text-xs font-semibold tracking-[0.16em] uppercase ${isOnMedia ? "text-code-foreground/90" : "text-accent"}`}
        >
          {hasTaxonomyArchives ? (
            <Link
              href={getLocalizedPath("ko", `categories/${article.category}`)}
              transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
              className="underline-offset-4 hover:underline"
              data-pagefind-filter="category"
            >
              {categoryLabel}
            </Link>
          ) : (
            <span data-pagefind-filter="category">{categoryLabel}</span>
          )}
          <span aria-hidden="true"> / </span>
          {article.topics.map((topic, index) => (
            <Fragment key={topic}>
              {hasTaxonomyArchives ? (
                <Link
                  href={getLocalizedPath("ko", `topics/${topic}`)}
                  transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
                  className="underline-offset-4 hover:underline"
                  data-pagefind-filter="topic"
                >
                  {getArticleTopicLabel(topic)}
                </Link>
              ) : (
                <span data-pagefind-filter="topic">{getArticleTopicLabel(topic)}</span>
              )}
              {index < article.topics.length - 1 ? ", " : ""}
            </Fragment>
          ))}
          <span aria-hidden="true"> / </span>
          {articleNumber}
        </p>
      </div>

      <h1
        id="article-title"
        data-pagefind-meta="title"
        className={`mt-6 max-w-[900px] text-4xl leading-[1.14] font-semibold tracking-[-0.05em] text-balance sm:text-5xl md:text-6xl ${isOnMedia ? "text-code-foreground" : "text-foreground"}`}
      >
        {article.title}
      </h1>
      <p
        className={`mt-6 max-w-[780px] text-lg leading-8 text-pretty md:text-xl md:leading-9 ${isOnMedia ? "text-code-foreground/85" : "text-muted"}`}
        data-pagefind-meta="description"
      >
        {article.description}
      </p>

      <PublicationMetadata
        author={article.author}
        labels={publicationLabels}
        publishedAt={{
          dateTime: article.publishedAt,
          text: formatPublicationDate(article.publishedAt, article.locale),
        }}
        modifiedAt={
          hasModifiedDate
            ? {
                dateTime: article.modifiedAt,
                text: formatPublicationDate(article.modifiedAt, article.locale),
              }
            : undefined
        }
        readingTime={{
          minutes: readingTimeMinutes,
          text: formatApproximateReadingTime(readingTimeMinutes, article.locale),
        }}
        tone={tone}
      />
    </>
  );
}

export function ArticleDetailHeader({ article, readingTimeMinutes }: PropsWithArticleDetailHeader) {
  const copy = ARTICLE_DETAIL_COPY[article.locale];

  return (
    <header>
      <ArchiveBackLink
        href={getLocalizedPath(article.locale, article.locale === "ko" ? "articles" : "")}
        label={copy.backLabel}
      />

      {article.coverImage ? (
        <ViewTransition name={`article-cover-${article.id}`} default="none" share="article-cover">
          <div className="article-detail-cover bg-canvas relative mt-8 min-h-[30rem] max-w-[1120px] overflow-hidden rounded-t-[4px] sm:min-h-[32rem] md:aspect-[32/17] md:min-h-0">
            <div className="article-detail-cover-media absolute inset-x-0 -top-[8%] h-[116%]">
              <Image
                fill
                priority
                sizes="(min-width: 1184px) 1120px, calc(100vw - 40px)"
                src={article.coverImage}
                alt=""
                className="object-cover"
              />
            </div>
            <div className="article-detail-cover-scrim absolute inset-0" aria-hidden="true" />
            <div
              className="article-detail-cover-fade pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <div className="relative z-10 flex min-h-[30rem] items-end px-5 pt-20 pb-28 sm:min-h-[32rem] sm:px-8 sm:pt-24 sm:pb-32 md:min-h-0 md:px-12 md:pt-28">
              <div className="w-full max-w-[940px]">
                <ArticleHeaderContent
                  article={article}
                  readingTimeMinutes={readingTimeMinutes}
                  tone="onMedia"
                />
              </div>
            </div>
          </div>
        </ViewTransition>
      ) : (
        <div className="mt-8 max-w-[940px]">
          <ArticleHeaderContent
            article={article}
            readingTimeMinutes={readingTimeMinutes}
            tone="default"
          />
        </div>
      )}
    </header>
  );
}
