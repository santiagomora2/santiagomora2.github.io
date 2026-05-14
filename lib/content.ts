import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export type AboutFrontmatter = {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  homeIntro: string;
  highlights: string[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
};

export type SkillsByCategory = Record<string, string[]>;

export type ExperienceEntry = {
  job_title: string;
  "time-interval": string;
  location: string;
  company: string;
  highlights: string[];
};

export type ResearchEntry = {
  title: string;
  description: string;
  tech: string | string[];
  institution: string;
  period: string;
  status: "In Progress" | "Published" | "Preprint" | "Draft";
  link?: string;
  findings: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

export async function getAboutContent() {
  const fullPath = path.join(contentDir, "about.md");
  const file = await fs.readFile(fullPath, "utf8");
  const parsed = matter(file);

  return {
    frontmatter: parsed.data as AboutFrontmatter,
    html: await markdownToHtml(parsed.content),
  };
}

export async function getProjects() {
  const fullPath = path.join(contentDir, "projects.json");
  const file = await fs.readFile(fullPath, "utf8");
  return JSON.parse(file) as Project[];
}

export async function getSkills() {
  const fullPath = path.join(contentDir, "skills.json");
  const file = await fs.readFile(fullPath, "utf8");
  return JSON.parse(file) as SkillsByCategory;
}

export async function getExperience() {
  const fullPath = path.join(contentDir, "experience.json");
  const file = await fs.readFile(fullPath, "utf8");
  return JSON.parse(file) as ExperienceEntry[];
}

export async function getResearch() {
  const fullPath = path.join(contentDir, "research.json");
  const file = await fs.readFile(fullPath, "utf8");
  return JSON.parse(file) as ResearchEntry[];
}

export async function getAllBlogPosts() {
  const blogDir = path.join(contentDir, "blog");
  const entries = await fs.readdir(blogDir);

  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const file = await fs.readFile(path.join(blogDir, fileName), "utf8");
        const parsed = matter(file);

        return {
          slug,
          title: String(parsed.data.title ?? slug),
          date: String(parsed.data.date ?? ""),
          summary: String(parsed.data.summary ?? ""),
        } as BlogPostMeta;
      }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug: string) {
  try {
    const fullPath = path.join(contentDir, "blog", `${slug}.md`);
    const file = await fs.readFile(fullPath, "utf8");
    const parsed = matter(file);

    return {
      slug,
      title: String(parsed.data.title ?? slug),
      date: String(parsed.data.date ?? ""),
      summary: String(parsed.data.summary ?? ""),
      html: await markdownToHtml(parsed.content),
    };
  } catch {
    return null;
  }
}
