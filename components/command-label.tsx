import { cn } from "@/lib/utils";

export function CommandLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 border-l pl-3 font-mono text-xs uppercase tracking-[0.12em]",
        "border-[var(--accent-soft-border)] text-[var(--accent-strong)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
