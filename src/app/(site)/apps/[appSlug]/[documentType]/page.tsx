import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PolicyDocumentPage } from "@/components/widgets/PolicyDocumentPage";
import {
  getBaseAppPolicyParams,
  getPolicyDocument,
  getPolicyLanguageAlternates,
} from "@/features/policy/policyDocuments";
import { NO_INDEX_FOLLOW_ROBOTS } from "@/features/seo/siteDiscovery";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBaseAppPolicyParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/apps/[appSlug]/[documentType]">): Promise<Metadata> {
  const { appSlug, documentType } = await params;
  const document = getPolicyDocument(`/apps/${appSlug}/${documentType}/`);
  if (!document) notFound();

  return {
    title: document.title,
    description: document.description,
    robots: NO_INDEX_FOLLOW_ROBOTS,
    alternates: {
      canonical: document.path,
      languages: getPolicyLanguageAlternates(document),
    },
    openGraph: {
      type: "website",
      url: document.path,
      title: document.title,
      description: document.description,
    },
  };
}

export default async function AppPolicyPage({
  params,
}: PageProps<"/apps/[appSlug]/[documentType]">) {
  const { appSlug, documentType } = await params;
  const document = getPolicyDocument(`/apps/${appSlug}/${documentType}/`);
  if (!document) notFound();

  return <PolicyDocumentPage document={document} />;
}
