import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CommandLabel } from "@/components/command-label";
import { SectionMotion } from "@/components/section-motion";
import { getAllBlogPosts, getBlogPost } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post" };
  }

  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <SectionMotion>
      <CommandLabel>cat {slug}.md</CommandLabel>
      <article className="markdown max-w-none text-[var(--text-muted)]">
        <p className="font-mono text-xs text-[var(--accent-strong)]">{post.date}</p>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <Link
        href="/blog"
        className="mt-8 inline-block font-mono text-sm text-[var(--accent-strong)] hover:opacity-80"
      >
        cd ../
      </Link>
    </SectionMotion>
  );
}
