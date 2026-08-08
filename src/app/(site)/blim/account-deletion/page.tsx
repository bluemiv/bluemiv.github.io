import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PolicyDocumentPage } from "@/components/widgets/PolicyDocumentPage";
import { getPolicyDocument } from "@/features/policy/policyDocuments";
import { NO_INDEX_FOLLOW_ROBOTS } from "@/features/seo/siteDiscovery";

const PATH = "/blim/account-deletion/";
const document = getPolicyDocument(PATH);

export const metadata: Metadata = document
  ? {
      title: document.title,
      description: document.description,
      robots: NO_INDEX_FOLLOW_ROBOTS,
      alternates: { canonical: document.path },
    }
  : {};

export default function BlimAccountDeletionPage() {
  if (!document) notFound();
  return <PolicyDocumentPage document={document} />;
}
