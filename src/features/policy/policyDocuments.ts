import { z } from "zod";

import generatedDocuments from "./policyDocuments.generated.json";

const POLICY_LOCALES = ["ko", "en", "ja", "zh-CN"] as const;

const POLICY_CONTACT_PATTERN =
  /(?:<span>(?:privacy officer|data protection contact|name|氏名|성명|担当者|個人情報保護責任者|담당자|개인정보 보호책임자)<\/span>|privacy officer|data protection contact|担当者|個人情報保護責任者|담당자|개인정보 보호책임자)\s*:\s*([^<]+)/gi;

function hasPrivatePolicyContact(html: string): boolean {
  return [...html.matchAll(POLICY_CONTACT_PATTERN)].some((match) => match[1].trim() !== "Bluemiv");
}

const POLICY_DOCUMENT_SCHEMA = z
  .object({
    path: z.string().regex(/^\/(?:[a-z0-9-]+\/)+$/),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    locale: z.enum(POLICY_LOCALES),
    html: z
      .string()
      .trim()
      .min(1)
      .refine((html) => !/<(?:script|style|iframe)\b|\son\w+=|javascript:/i.test(html), {
        message: "Policy HTML contains unsafe markup",
      })
      .refine(
        (html) =>
          !/\+82-10-\d{3,4}-\d{4}|직책\/직급:\s*없음|no formal title\/position|職名・職位：なし|无职务\/职级|public\.(?!bluemiv@)[\w.-]+@gmail\.com/i.test(
            html,
          ),
        { message: "Policy HTML contains private legacy contact data" },
      )
      .refine((html) => !hasPrivatePolicyContact(html), {
        message: "Policy HTML contains private policy contact data",
      }),
  })
  .strict();

const POLICY_DOCUMENTS_SCHEMA = z
  .array(POLICY_DOCUMENT_SCHEMA)
  .superRefine((documents, context) => {
    const paths = documents.map(({ path }) => path);
    if (new Set(paths).size !== paths.length) {
      context.addIssue({ code: "custom", message: "Duplicate policy path" });
    }
  });

export type PolicyDocument = z.infer<typeof POLICY_DOCUMENT_SCHEMA>;

export function parsePolicyDocuments(input: unknown): PolicyDocument[] {
  return POLICY_DOCUMENTS_SCHEMA.parse(input);
}

const POLICY_DOCUMENTS = parsePolicyDocuments(generatedDocuments);

function normalizePolicyPath(path: string): string {
  const normalized = `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return normalized === "//" ? "/" : normalized;
}

export function getPolicyDocuments(): readonly PolicyDocument[] {
  return POLICY_DOCUMENTS;
}

export function getPolicyDocument(path: string): PolicyDocument | undefined {
  const normalizedPath = normalizePolicyPath(path);
  return POLICY_DOCUMENTS.find((document) => document.path === normalizedPath);
}

export function getPolicyLanguageAlternates(document: PolicyDocument): Record<string, string> {
  return createPolicyLanguageAlternates(POLICY_DOCUMENTS, document);
}

export function createPolicyLanguageAlternates(
  documents: readonly PolicyDocument[],
  document: PolicyDocument,
): Record<string, string> {
  const basePath = document.path.replace(/(?:en|jp|cn|ko)\/$/, "");
  const candidates = documents.filter(({ path }) => {
    return path === basePath || path.replace(/(?:en|jp|cn|ko)\/$/, "") === basePath;
  });
  const alternates = Object.fromEntries(candidates.map(({ locale, path }) => [locale, path]));

  if (alternates.ko) alternates["x-default"] = alternates.ko;
  else if (candidates[0]) alternates["x-default"] = candidates[0].path;

  return alternates;
}

export function getBaseAppPolicyParams() {
  return POLICY_DOCUMENTS.flatMap(({ path }) => {
    const match = path.match(/^\/apps\/([^/]+)\/([^/]+)\/$/);
    return match ? [{ appSlug: match[1], documentType: match[2] }] : [];
  });
}

export function getLocalizedAppPolicyParams() {
  return POLICY_DOCUMENTS.flatMap(({ path }) => {
    const match = path.match(/^\/apps\/([^/]+)\/([^/]+)\/([^/]+)\/$/);
    return match ? [{ appSlug: match[1], documentType: match[2], language: match[3] }] : [];
  });
}

export function getBaseLegacyPolicyParams(documents: readonly PolicyDocument[] = POLICY_DOCUMENTS) {
  return documents.flatMap(({ path }) => {
    const match = path.match(/^\/privacy\/([^/]+)\/$/);
    return match ? [{ appSlug: match[1] }] : [];
  });
}

export function getLocalizedLegacyPolicyParams() {
  return POLICY_DOCUMENTS.flatMap(({ path }) => {
    const match = path.match(/^\/privacy\/([^/]+)\/([^/]+)\/$/);
    return match ? [{ appSlug: match[1], language: match[2] }] : [];
  });
}
