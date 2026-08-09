"use client";

import { useEffect, useRef } from "react";

import {
  COMMENT_CONFIG,
  type CommentLocale,
  getCommentDiscussionTerm,
  getCommentLanguage,
  getCommentTheme,
  GISCUS_ORIGIN,
  GISCUS_SCRIPT_URL,
} from "./commentConfig";

type PropsWithGiscusComments = {
  articleId: string;
  locale: CommentLocale;
};

type GiscusMessage = {
  giscus: {
    setConfig: {
      theme: ReturnType<typeof getCommentTheme>;
    };
  };
};

function getCurrentTheme() {
  return getCommentTheme(document.documentElement.classList.contains("dark"));
}

function syncGiscusTheme(container: HTMLDivElement) {
  const iframe = container.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
  if (!iframe?.contentWindow || !iframe.src.startsWith(GISCUS_ORIGIN)) return;

  const message: GiscusMessage = {
    giscus: {
      setConfig: {
        theme: getCurrentTheme(),
      },
    },
  };

  iframe.contentWindow.postMessage(message, GISCUS_ORIGIN);
}

export function GiscusComments({ articleId, locale }: PropsWithGiscusComments) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = GISCUS_SCRIPT_URL;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.repo = COMMENT_CONFIG.repository;
    script.dataset.repoId = COMMENT_CONFIG.repositoryId;
    script.dataset.category = COMMENT_CONFIG.category;
    script.dataset.categoryId = COMMENT_CONFIG.categoryId;
    script.dataset.mapping = "specific";
    script.dataset.term = getCommentDiscussionTerm(articleId);
    script.dataset.strict = "1";
    script.dataset.reactionsEnabled = "1";
    script.dataset.emitMetadata = "0";
    script.dataset.inputPosition = "top";
    script.dataset.theme = getCurrentTheme();
    script.dataset.lang = getCommentLanguage(locale);
    script.dataset.loading = "lazy";

    const syncTheme = () => syncGiscusTheme(container);
    const observer = new MutationObserver(syncTheme);

    script.addEventListener("load", syncTheme);
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    });
    container.append(script);

    return () => {
      observer.disconnect();
      script.removeEventListener("load", syncTheme);
      container.replaceChildren();
    };
  }, [articleId, locale]);

  return <div ref={containerRef} className="min-h-48" />;
}
