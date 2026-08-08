import Image from "next/image";
import Link from "next/link";

import { getArticleNumber } from "@/features/article/articleIdentifier";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import { getArticleDocument } from "@/features/article/articleRepository";
import { getArticleCategoryLabel, getArticleTopicLabel } from "@/features/article/articleTaxonomy";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { formatPublicationDate } from "@/features/i18n/publicationMetadata";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArticleListRow = {
  article: ArticleMetadata;
  locale: Locale;
};

export function ArticleListRow({ article, locale }: PropsWithArticleListRow) {
  const document = getArticleDocument(article.slug, locale);

  return (
    <article className="border-border border-b">
      <Link
        href={getLocalizedPath(locale, `articles/${article.slug}`)}
        transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
        className="article-list-link group flex items-start gap-4 px-2 py-6 sm:gap-5 md:gap-6 md:px-3 md:py-7"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-subtle font-mono text-xs">A{getArticleNumber(article.id)}</span>
            <span className="text-accent font-mono text-xs leading-5 font-semibold tracking-[0.06em] uppercase">
              {getArticleCategoryLabel(article.category)} /{" "}
              {getArticleTopicLabel(article.topics[0])}
            </span>
          </span>
          <strong className="article-list-title mt-3 block text-lg leading-7 font-semibold tracking-[-0.025em] break-keep md:text-xl">
            {article.title}
          </strong>
          <span className="text-muted mt-2 hidden text-sm leading-6 sm:line-clamp-2">
            {article.description}
          </span>
          <span className="text-muted mt-3 flex items-center gap-2 font-mono text-xs tabular-nums">
            <time dateTime={article.publishedAt}>
              {formatPublicationDate(article.publishedAt, locale)}
            </time>
            {document ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{document.readingTimeMinutes} MIN</span>
              </>
            ) : null}
          </span>
        </span>

        {article.coverImage ? (
          <span className="article-list-thumbnail relative aspect-[32/17] w-28 shrink-0 sm:w-40 md:w-44">
            <span className="article-list-thumbnail-media border-border group-hover:border-border-strong group-focus-visible:border-border-strong absolute inset-0 overflow-hidden rounded-[2px] border transition-colors duration-150 motion-reduce:transition-none">
              <Image
                fill
                sizes="(min-width: 768px) 176px, (min-width: 640px) 160px, 112px"
                src={article.coverImage}
                alt=""
                className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.01] group-focus-visible:scale-[1.01] motion-reduce:transition-none"
              />
            </span>
          </span>
        ) : null}
      </Link>
    </article>
  );
}
