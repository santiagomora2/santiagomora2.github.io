# Wii Portfolio - Santiago Mora

A personal portfolio built in the style of the **Nintendo Wii Main Menu**. Navigate through channels to explore my work, skills, research, and writing.

---

## Acknowledgments

The design, UI, and base architecture of this portfolio were built upon the amazing **wii-portfolio** created by [tobieche110](https://github.com/tobieche110/wii-portfolio). The Wii-style channel layout, animations, and overall aesthetic are entirely his work. I've adapted and extended it with my own content and new sections.

---

## Channels

| Channel | Content |
|---------|---------|
| About Me | Short bio and highlights |
| Work Experience | Professional timeline |
| Technologies | Skills by category |
| Education | Degree and academic background |
| Projects | Personal and professional projects |
| Research | Academic research work |
| Blog | Writing and posts |
| LinkedIn / GitHub | External profiles |
| Featured Project | [Dispatch - AI Agent CLI](https://github.com/santiagomora2/dispatch) |

---

## Content

All site content lives in `/content` and is fully editable without touching any component code:

```
content/
├── about.json          # Name, title, intro, highlights
├── education.json      # Degree(s)
├── experience.json     # Work history (array)
├── projects.json       # Projects (array)
├── research.json       # Research entries (array)
├── skills.json         # Skills by category (object)
├── links.json          # Social links, featured project, source repo URL
└── blog/
    └── posts.json      # Blog posts (array with id, title, date, summary, body)
```

To add a blog post, append an object to `content/blog/posts.json`:

```json
{
  "id": "my-new-post",
  "title": "Post title",
  "date": "YYYY-MM-DD",
  "summary": "One-line summary shown in the list.",
  "body": "Full post text. Separate paragraphs with a blank line (\\n\\n)."
}
```

---

## Stack

| Tool | Purpose |
|------|---------|
| React + Vite | UI framework and build |
| Tailwind CSS | Styling |
| GSAP | Animations |
| React Router | Client-side routing |

---

## Local setup

```bash
git clone <repo-url>
cd wii-portfolio
npm install
npm run dev
```

## Disclaimer

Not affiliated with or endorsed by Nintendo. Design inspired by the Nintendo Wii Main Menu for personal, non-commercial use. All Nintendo trademarks are property of their respective owners.
