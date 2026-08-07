"use client";

export function ThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="색상 테마 전환"
      className="inline-flex h-9 items-center gap-2 border-l border-border pl-4 text-xs font-bold uppercase tracking-[0.12em] text-muted transition-colors hover:text-foreground md:pl-6"
    >
      <span
        aria-hidden="true"
        className="block size-3 rounded-full border border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]"
      />
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}
