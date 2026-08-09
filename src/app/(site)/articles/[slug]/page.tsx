import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetailPage } from "@/components/widgets/ArticleDetailPage";
import { getArticleDocument, getPublishedArticles } from "@/features/article/articleRepository";
import { getArticleNavigation } from "@/features/article/articleNavigation";
import { getArticleStructuredData, serializeStructuredData } from "@/features/article/articleSeo";
import { getArticleCategoryLabel, getArticleTopicLabel } from "@/features/article/articleTaxonomy";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { createArticleSocialMetadata } from "@/features/seo/socialMetadata";
import { getTagLabels } from "@/features/tag/tagRegistry";

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
  const tagLabels = getTagLabels(article.tags);
  const keywords = [...new Set([...article.topics.map(getArticleTopicLabel), ...tagLabels])];

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    keywords,
    category: getArticleCategoryLabel(article.category),
    alternates: {
      canonical,
      languages: {
        ko: canonical,
        "x-default": canonical,
      },
    },
    ...createArticleSocialMetadata({
      title: article.title,
      description: article.description,
      canonical,
      locale: ARTICLE_LOCALE,
      publishedAt: article.publishedAt,
      modifiedAt: article.modifiedAt,
      author: article.author,
      tags: tagLabels,
      image: article.coverImage ? { url: article.coverImage, alt: article.title } : undefined,
    }),
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
