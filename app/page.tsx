import Link from "next/link";

import { CommandLabel } from "@/components/command-label";
import { SectionMotion } from "@/components/section-motion";
import { getAboutContent, getProjects, type Project } from "@/lib/content";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg)] p-4 transition-colors hover:border-[var(--accent-soft-border)]">
      <h2 className="text-sm font-semibold text-[var(--text-main)]">{project.title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{project.description}</p>
      <p className="mt-3 font-mono text-xs text-[var(--accent-strong)]">{project.tech.join(" • ")}</p>
      {(project.link ?? project.github) && (
        <div className="mt-3 flex gap-3 text-xs">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent-strong)]"
            >
              live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent-strong)]"
            >
              github
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default async function Home() {
  const [{ frontmatter }, projects] = await Promise.all([
    getAboutContent(),
    getProjects(),
  ]);
  const featuredProjects = projects.slice(0, 4);
  const remainingProjects = projects.slice(4);

  return (
    <div className="space-y-10">
      <SectionMotion>
        <CommandLabel>cat about_me.md</CommandLabel>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)] sm:text-3xl">
          {frontmatter.name}
        </h1>
        <p className="mt-2 font-mono text-sm text-[var(--accent-strong)]">{frontmatter.title}</p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
          {frontmatter.homeIntro}
        </p>
        <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
          {frontmatter.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="text-[var(--accent-strong)]">$</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </SectionMotion>

      <SectionMotion delay={0.08}>
        <CommandLabel>ls -a ./projects</CommandLabel>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        {remainingProjects.length > 0 && (
          <details className="mt-4 group">
            <summary className="cursor-pointer text-xs text-[var(--text-muted)] hover:text-[var(--accent-strong)]">
              Show {remainingProjects.length} more project
              {remainingProjects.length > 1 ? "s" : ""}
            </summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {remainingProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </details>
        )}
      </SectionMotion>

      <SectionMotion delay={0.16}>
        <CommandLabel>./connect.sh</CommandLabel>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={`mailto:${frontmatter.email}`}
            className="rounded-md border border-[var(--ui-border)] px-3 py-2 text-[var(--ui-text)] transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-strong)]"
          >
            {frontmatter.email}
          </a>
          <a
            href={frontmatter.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--ui-border)] px-3 py-2 text-[var(--ui-text)] transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-strong)]"
          >
            GitHub
          </a>
          <a
            href={frontmatter.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--ui-border)] px-3 py-2 text-[var(--ui-text)] transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-strong)]"
          >
            LinkedIn
          </a>
          <Link
            href="/blog"
            className="rounded-md border border-[var(--ui-border)] px-3 py-2 text-[var(--ui-text)] transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-strong)]"
          >
            Thoughts
          </Link>
        </div>
      </SectionMotion>
    </div>
  );
}
