import { BlinkingCursor } from "@/components/blinking-cursor";

export function TerminalWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--terminal-border)] bg-[var(--terminal-bg)] shadow-[0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-[var(--terminal-border)] bg-[var(--terminal-header)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-[var(--ui-text)]">santiago@portfolio:~</span>
      </div>
      <div className="max-h-[calc(100vh-10rem)] overflow-y-auto px-5 py-6 sm:px-8">
        {children}
        <div className="mt-8 font-mono text-sm text-[var(--accent-strong)]">
          <span className="opacity-70">$ </span>_
          <BlinkingCursor />
        </div>
      </div>
    </div>
  );
}
