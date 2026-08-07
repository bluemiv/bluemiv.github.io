import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PolicyDocumentPage } from "@/components/widgets/PolicyDocumentPage";
import { StaticRedirectPage } from "@/components/widgets/StaticRedirectPage";
import {
  getBaseLegacyPolicyParams,
  getPolicyDocument,
  getPolicyLanguageAlternates,
} from "@/features/policy/policyDocuments";
import {
  getLegacyPolicyRedirectParams,
  getPolicyRedirect,
} from "@/features/policy/policyRedirects";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getBaseLegacyPolicyParams(), ...getLegacyPolicyRedirectParams()];
}

export async function generateMetadata({
  params,
}: PageProps<"/privacy/[appSlug]">): Promise<Metadata> {
  const { appSlug } = await params;
  const source = `/privacy/${appSlug}/`;
  const destination = getPolicyRedirect(source);
  if (destination) {
    return {
      title: "Privacy Policy",
      alternates: { canonical: destination },
      robots: { index: false, follow: true },
    };
  }

  const document = getPolicyDocument(source);
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

export default async function LegacyPolicyPage({ params }: PageProps<"/privacy/[appSlug]">) {
  const { appSlug } = await params;
  const source = `/privacy/${appSlug}/`;
  const destination = getPolicyRedirect(source);
  if (destination) {
    return <StaticRedirectPage destination={destination} message="Privacy Policy로 이동합니다." />;
  }

  const document = getPolicyDocument(source);
  if (!document) notFound();
  return <PolicyDocumentPage document={document} />;
}
