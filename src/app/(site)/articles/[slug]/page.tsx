import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetailPage } from "@/components/widgets/ArticleDetailPage";
import { getArticleDocument, getPublishedArticles } from "@/features/article/articleRepository";
import { getArticleNavigation } from "@/features/article/articleNavigation";
import { getArticleStructuredData, serializeStructuredData } from "@/features/article/articleSeo";
import { getLocalizedPath } from "@/features/i18n/localeConfig";

const ARTICLE_LOCALE = "ko";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedArticles(ARTICLE_LOCALE).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleDocument(slug, ARTICLE_LOCALE)?.metadata;

  if (!article?.isPublished) notFound();

  const canonical = getLocalizedPath(ARTICLE_LOCALE, `articles/${article.slug}`);

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    keywords: article.tags,
    alternates: {
      canonical,
      languages: {
        ko: canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: canonical,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      authors: [article.author],
      tags: article.tags,
      images: article.coverImage ? [{ url: article.coverImage, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const articleDocument = getArticleDocument(slug, ARTICLE_LOCALE);

  if (!articleDocument?.metadata.isPublished) notFound();

  const { default: ArticleBody } = await import(`@/articles/${slug}/${ARTICLE_LOCALE}.mdx`);
  const articles = getPublishedArticles(ARTICLE_LOCALE);
  const navigation = getArticleNavigation(articleDocument.metadata, articles);
  const canonical = getLocalizedPath(ARTICLE_LOCALE, `articles/${articleDocument.metadata.slug}`);
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
