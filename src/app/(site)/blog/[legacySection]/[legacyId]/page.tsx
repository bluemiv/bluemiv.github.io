import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticRedirectPage } from "@/components/widgets/StaticRedirectPage";
import { getPublishedArticles } from "@/features/article/articleRepository";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { getPublishedNotes } from "@/features/note/noteRepository";

type LegacyRedirect = {
  legacySection: string;
  legacyId: string;
  destination: string;
};

const LEGACY_PATH_PATTERN = /^\/blog\/([^/]+)\/([^/]+)\/$/;

function createLegacyRedirects(): LegacyRedirect[] {
  const articleRedirects = getPublishedArticles("ko").flatMap((article) =>
    article.legacyPaths.map((legacyPath) => ({
      legacyPath,
      destination: getLocalizedPath("ko", `articles/${article.slug}`),
    })),
  );
  const noteRedirects = getPublishedNotes("ko").flatMap((note) =>
    note.legacyPaths.map((legacyPath) => ({
      legacyPath,
      destination: getLocalizedPath("ko", `notes/${note.slug}`),
    })),
  );

  return [...articleRedirects, ...noteRedirects].map(({ legacyPath, destination }) => {
    const match = legacyPath.match(LEGACY_PATH_PATTERN);

    if (!match) throw new Error(`Unsupported legacy path: ${legacyPath}`);

    return {
      legacySection: match[1],
      legacyId: match[2],
      destination,
    };
  });
}

const LEGACY_REDIRECTS = createLegacyRedirects();

function findLegacyRedirect(legacySection: string, legacyId: string) {
  return LEGACY_REDIRECTS.find(
    (redirect) => redirect.legacySection === legacySection && redirect.legacyId === legacyId,
  );
}

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
  const redirect = findLegacyRedirect(legacySection, legacyId);

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
  const redirect = findLegacyRedirect(legacySection, legacyId);

  if (!redirect) notFound();

  return (
    <StaticRedirectPage destination={redirect.destination} message="새 글 주소로 이동합니다." />
  );
}
