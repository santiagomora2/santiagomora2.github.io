"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="rounded-md border border-[var(--ui-border)] px-3 py-1.5 font-mono text-xs text-[var(--ui-text)] transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-strong)]"
    >
      <span className="opacity-75">$ </span>
      {isLight ? "theme dark" : "theme light"}
    </button>
  );
}
