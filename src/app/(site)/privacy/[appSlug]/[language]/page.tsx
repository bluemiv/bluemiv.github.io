import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PolicyDocumentPage } from "@/components/widgets/PolicyDocumentPage";
import {
  getLocalizedLegacyPolicyParams,
  getPolicyDocument,
  getPolicyLanguageAlternates,
} from "@/features/policy/policyDocuments";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalizedLegacyPolicyParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/privacy/[appSlug]/[language]">): Promise<Metadata> {
  const { appSlug, language } = await params;
  const document = getPolicyDocument(`/privacy/${appSlug}/${language}/`);
  if (!document) notFound();

  return {
    title: document.title,
    description: document.description,
    alternates: {
      canonical: document.path,
      languages: getPolicyLanguageAlternates(document),
    },
  };
}

export default async function LocalizedLegacyPolicyPage({
  params,
}: PageProps<"/privacy/[appSlug]/[language]">) {
  const { appSlug, language } = await params;
  const document = getPolicyDocument(`/privacy/${appSlug}/${language}/`);
  if (!document) notFound();

  return <PolicyDocumentPage document={document} />;
}
