import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticRedirectPage } from "@/components/widgets/StaticRedirectPage";
import { getPublishedArticles } from "@/features/article/articleRepository";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import {
  createLegacyRedirects,
  findLegacyRedirect,
} from "@/features/legacyRedirect/legacyRedirects";
import { getPublishedNotes } from "@/features/note/noteRepository";

const LEGACY_REDIRECTS = createLegacyRedirects(
  getPublishedArticles("ko"),
  getPublishedNotes("ko"),
  (slug) => getLocalizedPath("ko", `articles/${slug}`),
  (slug) => getLocalizedPath("ko", `notes/${slug}`),
);

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGACY_REDIRECTS.map(({ legacySection, legacyId }) => ({
    legacySection,
    legacyId,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[legacySection]/[legacyId]">): Promise<Metadata> {
  const { legacySection, legacyId } = await params;
  const redirect = findLegacyRedirect(LEGACY_REDIRECTS, legacySection, legacyId);

  if (!redirect) notFound();

  return {
    title: "새 주소로 이동",
    alternates: {
      canonical: redirect.destination,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LegacyRedirectPage({
  params,
}: PageProps<"/blog/[legacySection]/[legacyId]">) {
  const { legacySection, legacyId } = await params;
  const redirect = findLegacyRedirect(LEGACY_REDIRECTS, legacySection, legacyId);

  if (!redirect) notFound();

  return (
    <StaticRedirectPage destination={redirect.destination} message="새 글 주소로 이동합니다." />
  );
}
