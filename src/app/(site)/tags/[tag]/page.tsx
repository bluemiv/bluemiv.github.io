import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TagArchivePage } from "@/components/widgets/TagArchivePage";
import { getPublishedArticles } from "@/features/article/articleRepository";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { getPublishedNotes } from "@/features/note/noteRepository";
import { createWebsiteSocialMetadata } from "@/features/seo/socialMetadata";
import { filterEntriesByTag, summarizeTags } from "@/features/tag/tagCollection";
import { getTagLabel, isTagKey, type TagKey } from "@/features/tag/tagRegistry";

const TAG_LOCALE = "ko";

export const dynamicParams = false;

function getTagArchiveData() {
  const articles = getPublishedArticles(TAG_LOCALE);
  const notes = getPublishedNotes(TAG_LOCALE);
  const publishedTags = summarizeTags([...articles, ...notes]).map(({ tag }) => tag);

  return { articles, notes, publishedTags };
}

function isPublishedTag(tag: string, publishedTags: readonly TagKey[]): tag is TagKey {
  return isTagKey(tag) && publishedTags.includes(tag);
}

export function generateStaticParams() {
  return getTagArchiveData().publishedTags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const { publishedTags } = getTagArchiveData();

  if (!isPublishedTag(tag, publishedTags)) notFound();

  const tagLabel = getTagLabel(tag);
  const canonical = getLocalizedPath(TAG_LOCALE, `tags/${tag}`);
  const title = `${tagLabel} 태그 글`;
  const description = `${tagLabel} 태그가 포함된 글과 짧은 기록을 모았습니다.`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ko: canonical,
        "x-default": canonical,
      },
    },
    ...createWebsiteSocialMetadata({
      canonical,
      description,
      locale: TAG_LOCALE,
      title,
    }),
  };
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag } = await params;
  const { articles, notes, publishedTags } = getTagArchiveData();

  if (!isPublishedTag(tag, publishedTags)) notFound();

  return (
    <TagArchivePage
      articles={filterEntriesByTag(articles, tag)}
      locale={TAG_LOCALE}
      notes={filterEntriesByTag(notes, tag)}
      tag={tag}
    />
  );
}
