export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

export function resolveTheme(storedTheme: string | null, prefersDark: boolean): Theme {
  if (isTheme(storedTheme)) return storedTheme;
  return prefersDark ? "dark" : "light";
}

export function shouldAnimateThemeTransition(
  supportsViewTransition: boolean,
  prefersReducedMotion: boolean,
): boolean {
  return supportsViewTransition && !prefersReducedMotion;
}

export function getThemeInitializerScript(): string {
  return `(function(){try{var theme=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var dark=theme==="dark"||(theme!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark);}catch(e){}})();`;
}
