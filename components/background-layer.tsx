"use client";

import dynamic from "next/dynamic";

const ReactiveDots = dynamic(
  () => import("@/components/reactive-dots").then((mod) => mod.ReactiveDots),
  { ssr: false },
);

export function BackgroundLayer() {
  return <ReactiveDots />;
}
