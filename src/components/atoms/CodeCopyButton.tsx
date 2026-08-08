"use client";

import { useEffect, useRef, useState } from "react";

import { Check, Copy } from "lucide-react";

type CopyStatus = "idle" | "copied" | "error";

const COPY_FEEDBACK_DURATION = 2_000;

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Clipboard permission이 제한된 환경에서는 사용자 동작 기반 fallback을 시도한다.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();

  try {
    if (!document.execCommand("copy")) throw new Error("Copy command failed");
  } finally {
    textArea.remove();
  }
}

export function CodeCopyButton() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const feedbackTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
    };
  }, []);

  const resetStatusLater = () => {
    if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setStatus("idle"), COPY_FEEDBACK_DURATION);
  };

  const handleCopy = async (button: HTMLButtonElement) => {
    const code = button.closest(".article-code-block")?.querySelector("code")?.textContent;

    try {
      if (code === undefined) throw new Error("Code element not found");
      await copyText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    resetStatusLater();
  };

  const isCopied = status === "copied";
  const label = isCopied ? "Copied" : status === "error" ? "Retry" : "Copy";
  const accessibleLabel = isCopied
    ? "Code copied"
    : status === "error"
      ? "Copy failed. Try again"
      : "Copy code";

  return (
    <button
      type="button"
      className="article-code-copy"
      data-copy-status={status}
      aria-label={accessibleLabel}
      aria-live="polite"
      onClick={(event) => void handleCopy(event.currentTarget)}
    >
      {isCopied ? <Check aria-hidden="true" size={13} /> : <Copy aria-hidden="true" size={13} />}
      <span>{label}</span>
    </button>
  );
}
