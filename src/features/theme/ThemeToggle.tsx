"use client";

import { useRef, useSyncExternalStore } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";

import { resolveTheme, shouldAnimateThemeTransition, THEME_STORAGE_KEY } from "./themeConfig";

const THEME_CHANGE_EVENT = "bluemiv:theme-change";

type PropsWithThemeToggle = {
  labels?: {
    toggle: string;
    light: string;
    dark: string;
  };
};

const DEFAULT_LABELS = {
  toggle: "색상 테마 전환",
  light: "라이트 테마로 전환",
  dark: "다크 테마로 전환",
};

function subscribeToTheme(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key !== THEME_STORAGE_KEY) return;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextIsDark = resolveTheme(event.newValue, prefersDark) === "dark";
    document.documentElement.classList.toggle("dark", nextIsDark);
    onStoreChange();
  }

  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function getThemeSnapshot(): boolean | null {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot(): boolean | null {
  return null;
}

export function ThemeToggle({ labels = DEFAULT_LABELS }: PropsWithThemeToggle) {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const isTransitioningRef = useRef(false);

  function applyTheme(nextIsDark: boolean) {
    document.documentElement.classList.toggle("dark", nextIsDark);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light");
    } catch {
      // The selected theme still applies when storage is unavailable.
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  function toggleTheme() {
    if (isTransitioningRef.current) return;

    const nextIsDark = !document.documentElement.classList.contains("dark");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsViewTransition = typeof document.startViewTransition === "function";

    if (!shouldAnimateThemeTransition(supportsViewTransition, prefersReducedMotion)) {
      applyTheme(nextIsDark);
      return;
    }

    isTransitioningRef.current = true;
    document.documentElement.dataset.themeTransition = "wipe";

    const transition = document.startViewTransition(() => applyTheme(nextIsDark));
    const finishTransition = () => {
      delete document.documentElement.dataset.themeTransition;
      isTransitioningRef.current = false;
    };

    void transition.finished.then(finishTransition, finishTransition);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark === null ? labels.toggle : isDark ? labels.light : labels.dark}
      aria-pressed={isDark ?? undefined}
      className="text-muted hover:text-foreground inline-flex size-11 items-center justify-center transition-colors"
    >
      <span className="theme-wipe-rail" aria-hidden="true" />
      {isDark === null ? (
        <SunMoon aria-hidden="true" size={16} />
      ) : isDark ? (
        <Sun aria-hidden="true" size={16} />
      ) : (
        <Moon aria-hidden="true" size={16} />
      )}
    </button>
  );
}
