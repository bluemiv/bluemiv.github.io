"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
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

type PropsWithSearchMessage = {
  children: ReactNode;
};

const SEARCH_DELAY = 160;

function SearchMessage({ children }: PropsWithSearchMessage) {
  return (
    <div className="text-muted flex min-h-44 items-center text-sm">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="bg-accent h-px w-8 shrink-0" />
        <p className="max-w-[360px] leading-6">{children}</p>
      </div>
    </div>
  );
}

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
      className="border-border bg-canvas text-foreground before:bg-accent backdrop:bg-code/55 fixed inset-x-0 top-[var(--search-dialog-top)] mx-auto my-0 max-h-[min(720px,calc(100dvh_-_var(--search-dialog-top)_-_16px))] w-[min(720px,calc(100vw-24px))] [transform:translateY(8px)] overflow-hidden rounded-lg border p-0 opacity-0 shadow-xl transition-[opacity,transform,overlay,display] [transition-behavior:allow-discrete] duration-200 [--search-dialog-top:16px] backdrop:backdrop-blur-sm before:absolute before:inset-x-0 before:top-0 before:h-px before:content-[''] open:[transform:translateY(0)] open:opacity-100 motion-reduce:transition-none motion-reduce:open:[transform:none] sm:[--search-dialog-top:clamp(24px,8dvh,80px)]"
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClose={handleClosed}
    >
      <div className="border-border flex min-h-16 items-center justify-between gap-4 border-b px-4 sm:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] uppercase">
            <span aria-hidden="true" className="text-accent">
              S01
            </span>
            <p id="site-search-title">{copy.title}</p>
          </div>
          <p id="site-search-description" className="sr-only">
            {copy.description}
          </p>
        </div>
        <button
          type="button"
          className="site-search-close text-muted hover:text-foreground focus-visible:text-accent after:bg-accent relative inline-flex size-11 shrink-0 items-center justify-center transition-colors after:absolute after:right-3 after:bottom-1 after:left-3 after:h-px after:origin-center after:scale-x-0 after:transition-transform focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
          aria-label={copy.close}
          onClick={onRequestClose}
        >
          <X aria-hidden="true" size={19} />
        </button>
      </div>

      <form
        role="search"
        className="px-4 pt-4 sm:px-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="border-border-strong focus-within:border-accent bg-surface focus-within:bg-accent-soft/20 flex min-h-12 items-center gap-3 border px-4 transition-colors">
          <Search className="text-subtle shrink-0" aria-hidden="true" size={18} />
          <span className="sr-only">{copy.label}</span>
          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            className="site-search-input placeholder:text-subtle min-w-0 flex-1 bg-transparent text-base outline-none"
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

        <div
          className="border-border mt-3 flex flex-wrap border-b"
          role="group"
          aria-label={copy.filterLabel}
        >
          {(["all", "article", "note"] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={`site-search-filter after:bg-accent relative min-h-11 px-3 font-mono text-sm font-semibold tracking-[0.06em] uppercase transition-colors after:absolute after:right-3 after:bottom-[-1px] after:left-3 after:h-px after:origin-center after:scale-x-0 after:transition-transform motion-reduce:after:transition-none ${
                documentType === type
                  ? "text-accent after:scale-x-100"
                  : "text-muted hover:text-foreground focus-visible:text-accent focus-visible:after:scale-x-100"
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
          <SearchMessage>{resultStatus}</SearchMessage>
        ) : results.length ? (
          <>
            <div className="border-border text-muted flex min-h-10 items-center border-b font-mono text-xs tabular-nums">
              {copy.resultCount(results.length)}
            </div>
            <ol aria-label={copy.resultCount(results.length)}>
              {results.map((result, index) => (
                <li key={result.url} className="border-border border-b last:border-b-0">
                  <Link
                    href={result.url}
                    data-search-result
                    className="site-search-result group hover:bg-surface focus-visible:bg-surface before:bg-accent relative grid grid-cols-[32px_minmax(0,1fr)_20px] gap-3 py-5 transition-colors before:absolute before:inset-y-4 before:left-0 before:w-px before:origin-center before:scale-y-0 before:transition-transform before:content-[''] hover:before:scale-y-100 focus-visible:before:scale-y-100 motion-reduce:before:transition-none"
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
                      <span className="group-hover:text-accent group-focus-visible:text-accent mt-1 block text-lg font-semibold tracking-[-0.02em] transition-colors">
                        {result.title}
                      </span>
                      {result.excerpt ? (
                        <span
                          className="text-muted [&_mark]:bg-accent-soft [&_mark]:text-foreground mt-1.5 line-clamp-2 text-sm leading-6"
                          dangerouslySetInnerHTML={{ __html: result.excerpt }}
                        />
                      ) : null}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-subtle group-hover:text-accent group-focus-visible:text-accent transition-[color,transform] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
                      size={16}
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <SearchMessage>{copy.hint}</SearchMessage>
        )}
      </div>
    </dialog>
  );
}
