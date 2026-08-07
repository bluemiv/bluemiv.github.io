import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetailPage } from "@/components/widgets/ArticleDetailPage";
import { getArticleMetadata, getPublishedArticles } from "@/features/article/articleRepository";
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
  const article = getArticleMetadata(slug, ARTICLE_LOCALE);

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
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = getArticleMetadata(slug, ARTICLE_LOCALE);

  if (!article?.isPublished) notFound();

  return <ArticleDetailPage article={article} />;
}
