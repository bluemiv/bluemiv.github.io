"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

import type { Locale } from "@/features/i18n/localeConfig";
import type { SearchCopy } from "@/features/i18n/translations";

import { loadPagefind } from "./pagefindClient";
import {
  createSearchResult,
  getPagefindFilters,
  normalizeSearchQuery,
  SEARCH_RESULT_LIMIT,
  type SearchDocumentType,
  type SearchResult,
  shouldRunSearch,
} from "./searchResult";

type PropsWithSearchDialog = {
  copy: SearchCopy;
  isOpen: boolean;
  locale: Locale;
  onRequestClose: () => void;
  onRequestOpen: () => void;
  restoreFocusTargetRef?: { current: HTMLElement | null };
};

type SearchState = "idle" | "loading" | "ready" | "unavailable";

const SEARCH_DELAY = 160;

export function SearchDialog({
  copy,
  isOpen,
  locale,
  onRequestClose,
  onRequestOpen,
  restoreFocusTargetRef,
}: PropsWithSearchDialog) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");
  const requestIdRef = useRef(0);
  const [documentType, setDocumentType] = useState<SearchDocumentType>("all");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<readonly SearchResult[]>([]);
  const [state, setState] = useState<SearchState>("idle");

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) return;
      event.preventDefault();
      onRequestOpen();
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [onRequestOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      previousOverflowRef.current = document.documentElement.style.overflow;
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      window.requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }

    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = previousOverflowRef.current;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const normalizedQuery = normalizeSearchQuery(query);
    if (!shouldRunSearch(normalizedQuery)) return;

    const requestId = requestIdRef.current;

    const timeoutId = window.setTimeout(async () => {
      try {
        const pagefind = await loadPagefind();
        const response = await pagefind.search(normalizedQuery, {
          filters: getPagefindFilters(documentType),
        });
        const data = await Promise.all(
          response.results.slice(0, SEARCH_RESULT_LIMIT).map((result) => result.data()),
        );

        if (requestIdRef.current !== requestId) return;
        setResults(data.flatMap((item) => createSearchResult(item) ?? []));
        setState("ready");
      } catch {
        if (requestIdRef.current !== requestId) return;
        setResults([]);
        setState("unavailable");
      }
    }, SEARCH_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [documentType, isOpen, query]);

  function handleClosed() {
    const focusTarget = restoreFocusTargetRef?.current ?? previousFocusRef.current;
    if (restoreFocusTargetRef) restoreFocusTargetRef.current = null;
    document.documentElement.style.overflow = previousOverflowRef.current;
    setQuery("");
    setResults([]);
    setState("idle");
    setDocumentType("all");
    onRequestClose();
    focusTarget?.focus();
  }

  function focusFirstResult() {
    dialogRef.current?.querySelector<HTMLAnchorElement>("[data-search-result]")?.focus();
  }

  function handleQueryChange(nextQuery: string) {
    requestIdRef.current += 1;
    setQuery(nextQuery);

    if (shouldRunSearch(nextQuery)) {
      setState("loading");
      return;
    }

    setResults([]);
    setState("idle");
  }

  function handleDocumentTypeChange(nextDocumentType: SearchDocumentType) {
    requestIdRef.current += 1;
    setDocumentType(nextDocumentType);
    if (shouldRunSearch(query)) setState("loading");
  }

  const resultStatus =
    state === "loading"
      ? copy.loading
      : state === "unavailable"
        ? copy.unavailable
        : state === "ready" && results.length === 0
          ? copy.empty
          : "";

  return (
    <dialog
      ref={dialogRef}
      lang={locale}
      aria-labelledby="site-search-title"
      aria-describedby="site-search-description"
      className="border-border bg-canvas text-foreground fixed inset-0 m-auto max-h-[min(720px,calc(100dvh-32px))] w-[min(720px,calc(100vw-24px))] [transform:translateY(8px)] overflow-hidden rounded-[8px] border p-0 opacity-0 shadow-2xl transition-[opacity,transform,overlay,display] [transition-behavior:allow-discrete] duration-200 backdrop:bg-[#11120f]/45 backdrop:backdrop-blur-sm open:[transform:translateY(0)] open:opacity-100 motion-reduce:transition-none motion-reduce:open:[transform:none]"
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClose={handleClosed}
    >
      <div className="border-border flex min-h-16 items-center justify-between gap-4 border-b px-4 sm:px-6">
        <div className="min-w-0">
          <p
            id="site-search-title"
            className="font-mono text-xs font-semibold tracking-[0.14em] uppercase"
          >
            {copy.title}
          </p>
          <p id="site-search-description" className="text-muted mt-0.5 truncate text-sm">
            {copy.description}
          </p>
        </div>
        <button
          type="button"
          className="text-muted hover:text-foreground inline-flex size-11 shrink-0 items-center justify-center transition-colors"
          aria-label={copy.close}
          onClick={onRequestClose}
        >
          <X aria-hidden="true" size={19} />
        </button>
      </div>

      <form
        role="search"
        className="border-border border-b px-4 py-4 sm:px-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="border-border-strong focus-within:border-accent bg-surface flex min-h-12 items-center gap-3 border px-4 transition-colors">
          <Search className="text-subtle shrink-0" aria-hidden="true" size={18} />
          <span className="sr-only">{copy.label}</span>
          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            className="placeholder:text-subtle min-w-0 flex-1 bg-transparent text-base outline-none"
            placeholder={copy.placeholder}
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" && results.length) {
                event.preventDefault();
                focusFirstResult();
              }
            }}
          />
          <kbd className="text-subtle hidden font-mono text-xs sm:block">ESC</kbd>
        </label>

        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={copy.filterLabel}>
          {(["all", "article", "note"] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={`min-h-11 px-3 font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
                documentType === type
                  ? "bg-accent text-on-accent"
                  : "border-border text-muted hover:text-foreground border"
              }`}
              aria-pressed={documentType === type}
              onClick={() => handleDocumentTypeChange(type)}
            >
              {copy.filters[type]}
            </button>
          ))}
        </div>
      </form>

      <div
        className="max-h-[min(488px,calc(100dvh-248px))] overflow-y-auto px-4 sm:px-6"
        aria-busy={state === "loading"}
      >
        <p className="sr-only" aria-live="polite">
          {state === "ready" && results.length ? copy.resultCount(results.length) : resultStatus}
        </p>

        {resultStatus ? (
          <div className="text-muted flex min-h-48 items-center justify-center text-center text-sm">
            <p className="max-w-[360px] leading-6">{resultStatus}</p>
          </div>
        ) : results.length ? (
          <ol aria-label={copy.resultCount(results.length)}>
            {results.map((result, index) => (
              <li key={result.url} className="border-border border-b last:border-b-0">
                <Link
                  href={result.url}
                  data-search-result
                  className="group focus-visible:outline-accent grid grid-cols-[32px_minmax(0,1fr)_20px] gap-3 py-5 outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                  onClick={onRequestClose}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                    event.preventDefault();
                    const links = Array.from(
                      dialogRef.current?.querySelectorAll<HTMLAnchorElement>(
                        "[data-search-result]",
                      ) ?? [],
                    );
                    const nextIndex =
                      event.key === "ArrowDown"
                        ? Math.min(index + 1, links.length - 1)
                        : Math.max(index - 1, 0);
                    links[nextIndex]?.focus();
                  }}
                >
                  <span className="text-subtle pt-0.5 font-mono text-xs tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
                      {copy.types[result.type]}
                      {result.category ? ` / ${result.category}` : ""}
                    </span>
                    <span className="group-hover:text-accent mt-1 block text-lg font-semibold tracking-[-0.02em] transition-colors">
                      {result.title}
                    </span>
                    {result.excerpt ? (
                      <span
                        className="text-muted [&_mark]:bg-accent-soft [&_mark]:text-foreground mt-1.5 line-clamp-2 block text-sm leading-6"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    ) : null}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-subtle group-hover:text-accent transition-[color,transform] group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="text-muted flex min-h-48 items-center justify-center text-center text-sm">
            <p>{copy.hint}</p>
          </div>
        )}
      </div>
    </dialog>
  );
}
