import type { Metadata } from "next";
import Link from "next/link";

import { CommandLabel } from "@/components/command-label";
import { SectionMotion } from "@/components/section-motion";
import { getAllBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <SectionMotion>
      <CommandLabel>ls -la ./thoughts/</CommandLabel>
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg)] p-4 transition-colors hover:border-[var(--accent-soft-border)]"
          >
            <p className="font-mono text-xs text-[var(--accent-strong)]">{post.date}</p>
            <h2 className="mt-1 text-lg font-semibold text-[var(--text-main)]">{post.title}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{post.summary}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block font-mono text-sm text-[var(--accent-strong)] hover:opacity-80"
            >
              cat {post.slug}.md
            </Link>
          </article>
        ))}
      </div>
    </SectionMotion>
  );
}
