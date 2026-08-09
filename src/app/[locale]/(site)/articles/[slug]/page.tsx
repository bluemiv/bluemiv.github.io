import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetailPage } from "@/components/widgets/ArticleDetailPage";
import { createArticlePageMetadata } from "@/features/article/articlePageMetadata";
import {
  getArticleDocument,
  getPublishedArticleLocales,
  getPublishedArticles,
} from "@/features/article/articleRepository";
import { getArticleNavigation } from "@/features/article/articleNavigation";
import { getArticleStructuredData, serializeStructuredData } from "@/features/article/articleSeo";
import { getLocalizedPath, isPrefixedLocale, PREFIXED_LOCALES } from "@/features/i18n/localeConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.flatMap((locale) =>
    getPublishedArticles(locale).map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/articles/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  const article = getArticleDocument(slug, locale)?.metadata;
  if (!article?.isPublished) notFound();

  return createArticlePageMetadata(article, getPublishedArticleLocales(slug));
}

export default async function LocalizedArticlePage({
  params,
}: PageProps<"/[locale]/articles/[slug]">) {
  const { locale, slug } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  const articleDocument = getArticleDocument(slug, locale);
  if (!articleDocument?.metadata.isPublished) notFound();

  const { default: ArticleBody } = await import(`@/articles/${slug}/${locale}.mdx`);
  const articles = getPublishedArticles(locale);
  const navigation = getArticleNavigation(articleDocument.metadata, articles);
  const canonical = getLocalizedPath(locale, `articles/${articleDocument.metadata.slug}`);
  const structuredData = getArticleStructuredData(articleDocument.metadata, canonical);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      <ArticleDetailPage
        article={articleDocument.metadata}
        headings={articleDocument.headings}
        readingTimeMinutes={articleDocument.readingTimeMinutes}
        navigation={navigation}
      >
        <ArticleBody />
      </ArticleDetailPage>
    </>
  );
}
