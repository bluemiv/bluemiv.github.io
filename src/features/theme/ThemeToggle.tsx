"use client";

import { useSyncExternalStore } from "react";

const THEME_CHANGE_EVENT = "bluemiv:theme-change";

function subscribeToTheme(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key !== "theme") return;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextIsDark =
      event.newValue === "dark" || (event.newValue === null && prefersDark);
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

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function toggleTheme() {
    const nextIsDark = document.documentElement.classList.toggle("dark");

    try {
      window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    } catch {
      // The selected theme still applies when storage is unavailable.
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark === null
          ? "색상 테마 전환"
          : isDark
            ? "라이트 테마로 전환"
            : "다크 테마로 전환"
      }
      aria-pressed={isDark ?? undefined}
      className="border-border text-muted hover:text-foreground inline-flex min-h-11 items-center gap-2 border-l pl-3 text-xs font-bold tracking-[0.12em] uppercase transition-colors md:pl-6"
    >
      <span
        aria-hidden="true"
        className="block size-3 rounded-full border border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]"
      />
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}
