"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export function SkillTag({ skill }: { skill: string }) {
  const [active, setActive] = useState(false);

  return (
    <span
      className={cn(
        "inline-flex rounded-sm border px-2.5 py-1 text-xs transition-colors duration-150",
        active
          ? "border-[var(--accent-soft-border)] bg-[var(--accent-soft-bg)] text-[var(--accent-soft-text)]"
          : "border-[var(--ui-border)] bg-[var(--surface-bg)] text-[var(--text-muted)]",
      )}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      {skill}
    </span>
  );
}
