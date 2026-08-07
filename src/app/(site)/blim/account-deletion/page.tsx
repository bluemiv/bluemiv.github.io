import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PolicyDocumentPage } from "@/components/widgets/PolicyDocumentPage";
import { getPolicyDocument } from "@/features/policy/policyDocuments";

const PATH = "/blim/account-deletion/";
const document = getPolicyDocument(PATH);

export const metadata: Metadata = document
  ? {
      title: document.title,
      description: document.description,
      alternates: { canonical: document.path },
    }
  : {};

export default function BlimAccountDeletionPage() {
  if (!document) notFound();
  return <PolicyDocumentPage document={document} />;
}
