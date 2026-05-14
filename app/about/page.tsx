import type { Metadata } from "next";

import { AboutTabs } from "@/components/about-tabs";
import { CommandLabel } from "@/components/command-label";
import { SectionMotion } from "@/components/section-motion";
import { getAboutContent, getExperience, getResearch, getSkills } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const [{ html, frontmatter }, skills, experiences, research] = await Promise.all([
    getAboutContent(),
    getSkills(),
    getExperience(),
    getResearch(),
  ]);

  return (
    <div className="space-y-8">
      <SectionMotion>
        <CommandLabel>cat about_me.md</CommandLabel>
        <div className="max-w-3xl">
          <h1 className="!mt-0 text-2xl font-semibold tracking-tight text-[var(--text-main)] sm:text-3xl">
            {frontmatter.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-[var(--accent-strong)]">{frontmatter.title}</p>
          <div className="markdown mt-4 text-[var(--text-muted)]" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </SectionMotion>

      <SectionMotion delay={0.08}>
        <CommandLabel>cat profile_tabs.config</CommandLabel>
        <AboutTabs skills={skills} experiences={experiences} research={research} />
      </SectionMotion>
    </div>
  );
}
