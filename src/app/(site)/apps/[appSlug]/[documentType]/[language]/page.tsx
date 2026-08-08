import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PolicyDocumentPage } from "@/components/widgets/PolicyDocumentPage";
import {
  getLocalizedAppPolicyParams,
  getPolicyDocument,
  getPolicyLanguageAlternates,
} from "@/features/policy/policyDocuments";
import { NO_INDEX_FOLLOW_ROBOTS } from "@/features/seo/siteDiscovery";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalizedAppPolicyParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/apps/[appSlug]/[documentType]/[language]">): Promise<Metadata> {
  const { appSlug, documentType, language } = await params;
  const document = getPolicyDocument(`/apps/${appSlug}/${documentType}/${language}/`);
  if (!document) notFound();

  return {
    title: document.title,
    description: document.description,
    robots: NO_INDEX_FOLLOW_ROBOTS,
    alternates: {
      canonical: document.path,
      languages: getPolicyLanguageAlternates(document),
    },
  };
}

export default async function LocalizedAppPolicyPage({
  params,
}: PageProps<"/apps/[appSlug]/[documentType]/[language]">) {
  const { appSlug, documentType, language } = await params;
  const document = getPolicyDocument(`/apps/${appSlug}/${documentType}/${language}/`);
  if (!document) notFound();

  return <PolicyDocumentPage document={document} />;
}
