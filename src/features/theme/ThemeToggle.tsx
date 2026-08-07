"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";

import { resolveTheme, THEME_STORAGE_KEY } from "./themeConfig";

const THEME_CHANGE_EVENT = "bluemiv:theme-change";

type ThemeToggleProps = {
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

export function ThemeToggle({ labels = DEFAULT_LABELS }: ThemeToggleProps) {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  function toggleTheme() {
    const nextIsDark = document.documentElement.classList.toggle("dark");

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light");
    } catch {
      // The selected theme still applies when storage is unavailable.
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark === null ? labels.toggle : isDark ? labels.light : labels.dark}
      aria-pressed={isDark ?? undefined}
      className="text-muted hover:text-foreground inline-flex size-11 items-center justify-center transition-colors"
    >
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
