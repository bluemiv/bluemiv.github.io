import type { PagefindResultData } from "./searchResult";

type PagefindSearchOptions = {
  filters?: Record<string, string>;
};

type PagefindSearchItem = {
  data: () => Promise<PagefindResultData>;
};

export type PagefindSearchResponse = {
  results: readonly PagefindSearchItem[];
};

type PagefindModule = {
  init: () => Promise<void>;
  search: (query: string, options?: PagefindSearchOptions) => Promise<PagefindSearchResponse>;
};

const PAGEFIND_MODULE_PATH = "/pagefind/pagefind.js";

let pagefindPromise: Promise<PagefindModule> | undefined;

export function loadPagefind(): Promise<PagefindModule> {
  if (!pagefindPromise) {
    pagefindPromise = import(/* webpackIgnore: true */ PAGEFIND_MODULE_PATH).then(
      async (module) => {
        const pagefind = module as unknown as PagefindModule;
        await pagefind.init();
        return pagefind;
      },
    );
  }

  return pagefindPromise;
}
