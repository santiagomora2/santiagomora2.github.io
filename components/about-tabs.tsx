"use client";

import { useState } from "react";

import { SkillTag } from "@/components/skill-tag";
import type { ExperienceEntry, ResearchEntry, SkillsByCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

type AboutTab = "skills" | "experience" | "research";

const tabCommand: Record<AboutTab, string> = {
  skills: "ls -a .skills/",
  experience: "cat experience.json",
  research: "cat research.json",
};

const statusStyle: Record<ResearchEntry["status"], string> = {
  "In Progress": "border-[var(--accent-soft-border)] text-[var(--accent-strong)]",
  Published: "border-[#60a5fa]/50 text-[#b6d6ff]",
  Preprint: "border-[#facc15]/50 text-[#ffe18d]",
  Draft: "border-[var(--ui-border)] text-[var(--text-muted)]",
};

export function AboutTabs({
  skills,
  experiences,
  research,
}: {
  skills: SkillsByCategory;
  experiences: ExperienceEntry[];
  research: ResearchEntry[];
}) {
  const [activeTab, setActiveTab] = useState<AboutTab>("skills");

  return (
    <section>
      <div className="mb-4 flex flex-wrap gap-2 border-b border-[var(--ui-border)] pb-4">
        {(["skills", "experience", "research"] as AboutTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
              activeTab === tab
                ? "border-[var(--accent-soft-border)] bg-[var(--accent-soft-bg)] text-[var(--accent-soft-text)]"
                : "border-[var(--ui-border)] text-[var(--ui-text)] hover:border-[var(--ui-hover-border)] hover:text-[var(--ui-strong)]",
            )}
          >
            <span className="opacity-75">$ </span>
            {tabCommand[tab]}
          </button>
        ))}
      </div>

      {activeTab === "skills" && (
        <div className="space-y-5">
          {Object.entries(skills).map(([category, categorySkills]) => (
            <section key={category}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {category}
              </h2>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {activeTab === "experience" && (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <article
              key={`${experience.company}-${experience.job_title}`}
              className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-bg)] p-4"
            >
              <h3 className="text-sm font-semibold text-[var(--text-main)]">
                {experience.job_title}
              </h3>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {experience.company} · {experience.location}
              </p>
              <p className="mt-1 font-mono text-xs text-[var(--accent-strong)]">
                {experience["time-interval"]}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-[var(--text-muted)]">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="text-[var(--accent-strong)]">-</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}

      {activeTab === "research" && (
        <div className="space-y-4">
          {research.map((entry) => (
            <article
              key={`${entry.institution}-${entry.title}`}
              className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-bg)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-[var(--text-main)]">
                  {entry.title}
                </h3>
                <span
                  className={cn(
                    "rounded-sm border px-2 py-0.5 text-[11px] font-mono",
                    statusStyle[entry.status],
                  )}
                >
                  {entry.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{entry.description}</p>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                {entry.institution} · {entry.period}
              </p>
              <p className="mt-1 font-mono text-xs text-[var(--accent-strong)]">
                Tech: {Array.isArray(entry.tech) ? entry.tech.join(", ") : entry.tech}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{entry.findings}</p>
              {entry.link && (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block font-mono text-xs text-[var(--accent-strong)] hover:opacity-80"
                >
                  open_link.sh
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
