import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-[#4ade80]/50 bg-[#1f3227] text-[#9effc0]",
        blue: "border-[#60a5fa]/50 bg-[#162338] text-[#9cc9ff]",
        amber: "border-[#fbbf24]/50 bg-[#35280f] text-[#ffd98e]",
        violet: "border-[#a78bfa]/50 bg-[#271f3b] text-[#d0c0ff]",
        zinc: "border-zinc-500/50 bg-zinc-800 text-zinc-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
