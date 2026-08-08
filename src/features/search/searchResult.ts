export const SEARCH_QUERY_MINIMUM_LENGTH = 2;
export const SEARCH_RESULT_LIMIT = 8;

export type SearchDocumentType = "all" | "article" | "note";

export type PagefindResultData = {
  excerpt?: string;
  filters?: Record<string, readonly string[]>;
  meta?: Record<string, string>;
  url?: string;
};

export type SearchResult = {
  category?: string;
  excerpt: string;
  title: string;
  type: Exclude<SearchDocumentType, "all">;
  url: string;
};

export function normalizeSearchQuery(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

export function shouldRunSearch(query: string): boolean {
  return Array.from(normalizeSearchQuery(query)).length >= SEARCH_QUERY_MINIMUM_LENGTH;
}

export function getPagefindFilters(
  documentType: SearchDocumentType,
): Record<string, string> | undefined {
  return documentType === "all" ? undefined : { type: documentType };
}

export function sanitizeSearchExcerpt(excerpt: string): string {
  return excerpt
    .replace(/<mark\b[^>]*>/gi, "<mark>")
    .replace(/<\/mark\s*>/gi, "</mark>")
    .replace(/<(?!\/?mark>)[^>]*>/gi, "");
}

function getDocumentType(data: PagefindResultData): SearchResult["type"] {
  return data.filters?.type?.includes("note") ? "note" : "article";
}

export function createSearchResult(data: PagefindResultData): SearchResult | null {
  const title = data.meta?.title?.trim();
  const url = data.url?.trim();

  if (!title || !url || !url.startsWith("/")) return null;

  return {
    category: data.meta?.category?.trim() || undefined,
    excerpt: sanitizeSearchExcerpt(data.excerpt?.trim() ?? ""),
    title,
    type: getDocumentType(data),
    url,
  };
}
