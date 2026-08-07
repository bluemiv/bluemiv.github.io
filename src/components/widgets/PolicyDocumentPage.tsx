import { Container } from "@/components/atoms/Container";
import type { PolicyDocument } from "@/features/policy/policyDocuments";

type PolicyDocumentPageProps = {
  document: PolicyDocument;
};

export function PolicyDocumentPage({ document }: PolicyDocumentPageProps) {
  return (
    <Container className="py-14 md:py-20">
      <div className="mx-auto max-w-[820px]">
        <div className="border-border text-muted mb-10 flex items-center justify-between border-b pb-4 font-mono text-[10px] tracking-[0.12em] uppercase">
          <span>Legal document</span>
          <span>{document.locale}</span>
        </div>
        <article
          lang={document.locale}
          className="policy-body"
          dangerouslySetInnerHTML={{ __html: document.html }}
        />
      </div>
    </Container>
  );
}
