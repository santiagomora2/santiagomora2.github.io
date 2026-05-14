"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle").then((mod) => mod.ThemeToggle),
  { ssr: false },
);

const links = [
  { href: "/", label: "home", command: "cat about_me.md" },
  { href: "/about", label: "about", command: "ls -a .skills/" },
  { href: "/blog", label: "blog", command: "./thoughts.sh" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 border-b border-[var(--ui-border)] pb-5">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === link.href : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
              isActive
                ? "border-[var(--accent-soft-border)] bg-[var(--accent-soft-bg)] text-[var(--accent-soft-text)]"
                : "border-[var(--ui-border)] text-[var(--ui-text)] hover:border-[var(--ui-hover-border)] hover:text-[var(--ui-strong)]",
            )}
          >
            <span className="opacity-75">$ </span>
            {link.command}
          </Link>
        );
      })}
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
