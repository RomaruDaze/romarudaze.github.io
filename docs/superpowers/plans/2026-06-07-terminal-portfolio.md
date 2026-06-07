# Terminal-Themed Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild romarudaze.github.io as a single-page, terminal/Claude-Code-themed project showcase with About, Projects, and Experience sections, built on the existing blank Vite + React + TypeScript scaffold.

**Architecture:** A single scrolling page (`App.tsx`) assembles five presentational sections — Header, About, Projects, Experience, Footer — each in its own folder under `src/components/`. Project and experience content live in typed data files under `src/data/`, so future updates are data edits, not component edits. Shared visual language (colors, fonts, terminal motifs) is centralized as CSS custom properties in `src/index.css`.

**Tech Stack:** React 18, TypeScript, Vite, plain CSS with custom properties (no UI framework), JetBrains Mono + Inter via Google Fonts, inline SVG icons.

**Note on verification:** This project has no test runner and is primarily visual — there isn't an existing Vitest/Jest setup, and adding one for a handful of presentational components would be over-engineering (YAGNI). Each task is instead verified by: TypeScript compiling cleanly (`npx tsc -b --noEmit`), ESLint passing (`npm run lint`), and a manual check in the browser via the Vite dev server (`npm run dev`, open `http://localhost:5173`). The final task runs a full production build.

---

## File Structure

```
index.html                              — modified: Google Fonts links
src/
  index.css                             — modified: theme tokens + base styles
  App.tsx                               — modified: assembles all sections
  data/
    social.ts                           — new: social link list (email/GitHub/LinkedIn)
    projects.ts                         — new: typed project entries
    experience.ts                       — new: typed experience entries
  components/
    icons/
      icons.tsx                         — new: GitHubIcon, LinkedInIcon, EmailIcon (inline SVG)
    section-heading/
      section-heading.tsx               — new: shared "$ <command>" heading
    header/
      header.tsx, header.css            — new: sticky nav bar + social links
    about/
      about.tsx, about.css              — new: hero/intro section
    projects/
      project-grid.tsx, project-grid.css   — new: grid layout + modal state
      project-card.tsx, project-card.css   — new: individual project card
      project-modal.tsx, project-modal.css — new: expanded project detail overlay
    experience/
      timeline.tsx, timeline.css        — new: vertical experience timeline
    footer/
      footer.tsx, footer.css            — new: sign-off + social links
```

---

### Task 1: Dependency cleanup

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove unused dependencies**

Edit `package.json` and delete these entries from `"dependencies"`:
`@fortawesome/fontawesome-svg-core`, `@fortawesome/free-brands-svg-icons`,
`@fortawesome/free-regular-svg-icons`, `@fortawesome/free-solid-svg-icons`,
`@fortawesome/react-fontawesome`, `axios`, `bootstrap`, `dotenv`,
`emailjs-com`, `react-router-dom`.

The remaining `"dependencies"` block should read exactly:

```json
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
```

- [ ] **Step 2: Reinstall to update the lockfile**

Run: `npm install`
Expected: completes with no errors; `package-lock.json` is updated to drop the removed packages.

- [ ] **Step 3: Verify the project still builds and lints**

Run: `npx tsc -b --noEmit && npm run lint`
Expected: both commands exit with status 0 and no output (the current `App.tsx` only uses React, so nothing should reference the removed packages).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove dependencies unused by the new design"
```

---

### Task 2: Theme tokens & global styles

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`

- [ ] **Step 1: Add Google Fonts links to `index.html`**

In `index.html`, replace the contents of the `<head>` so it reads:

```html
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <title>Roger Marvin</title>
  </head>
```

- [ ] **Step 2: Replace `src/index.css` with theme tokens and base styles**

Replace the full contents of `src/index.css` with:

```css
:root {
  --color-bg: #0d1117;
  --color-bg-elevated: #161b22;
  --color-border: #30363d;
  --color-text-primary: #e6edf3;
  --color-text-secondary: #8b949e;
  --color-accent: #353fbd;
  --color-accent-bright: #5b65e0;
  --color-success: #7ee787;
  --color-comment: #e3b341;

  --font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-mono);
  line-height: 1.25;
  margin: 0;
  font-weight: 600;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

button {
  font-family: var(--font-body);
}

.section {
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.section__heading {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.section__heading-prompt {
  color: var(--color-accent-bright);
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.cursor {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  background: var(--color-accent-bright);
  margin-left: 0.2em;
  vertical-align: text-bottom;
  animation: blink 1s steps(1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`
Open `http://localhost:5173`. Expected: dark near-black background, "Hello, world!" text rendered in light color using the Inter font (the JetBrains Mono font will become visible once headings are added in later tasks).

- [ ] **Step 4: Commit**

```bash
git add index.html src/index.css
git commit -m "feat: add terminal theme tokens and base global styles"
```

---

### Task 3: Shared SectionHeading component

**Files:**
- Create: `src/components/section-heading/section-heading.tsx`

- [ ] **Step 1: Create the component**

```tsx
interface SectionHeadingProps {
  command: string;
}

function SectionHeading({ command }: SectionHeadingProps) {
  return (
    <p className="section__heading">
      <span className="section__heading-prompt">$</span> {command}
    </p>
  );
}

export default SectionHeading;
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: exits with status 0 (the component isn't used yet, so this just confirms it compiles standalone).

- [ ] **Step 3: Commit**

```bash
git add src/components/section-heading/section-heading.tsx
git commit -m "feat: add shared SectionHeading terminal-prompt component"
```

---

### Task 4: Data layer — social links, projects, experience

**Files:**
- Create: `src/data/social.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`

- [ ] **Step 1: Create `src/data/social.ts`**

```ts
export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
}

// Replace these placeholder URLs with your real profile links.
export const socialLinks: SocialLink[] = [
  { id: "email", label: "Email", href: "mailto:your-email@example.com", icon: "email" },
  { id: "github", label: "GitHub", href: "https://github.com/your-username", icon: "github" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/your-username", icon: "linkedin" },
];
```

- [ ] **Step 2: Create `src/data/projects.ts`**

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  links: {
    live?: string;
    repo?: string;
  };
}

// Sample entries — replace with your real projects. Adding a new project
// is just adding another object to this array; no component changes needed.
export const projects: Project[] = [
  {
    id: "sample-project-one",
    title: "Sample Project One",
    description:
      "A short description of what this project does, the problem it solves, and the stack you used.",
    tags: ["React", "TypeScript"],
    links: {
      repo: "https://github.com/your-username/sample-project-one",
    },
  },
  {
    id: "sample-project-two",
    title: "Sample Project Two",
    description:
      "Another short description — what it is, why you built it, and anything notable about the approach.",
    tags: ["Node.js", "PostgreSQL"],
    links: {
      live: "https://example.com",
      repo: "https://github.com/your-username/sample-project-two",
    },
  },
];
```

- [ ] **Step 3: Create `src/data/experience.ts`**

```ts
export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}

// Sample entries — replace with your real history, most recent first.
export const experience: ExperienceEntry[] = [
  {
    id: "sample-role-one",
    role: "Software Engineer",
    organization: "Sample Company",
    period: "2024 — Present",
    description:
      "Brief summary of your responsibilities and impact in this role.",
    tags: ["TypeScript", "React"],
  },
  {
    id: "sample-role-two",
    role: "B.S. in Computer Science",
    organization: "Sample University",
    period: "2020 — 2024",
    description: "Relevant coursework, honors, or projects worth mentioning.",
  },
];
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: exits with status 0.

- [ ] **Step 5: Commit**

```bash
git add src/data/social.ts src/data/projects.ts src/data/experience.ts
git commit -m "feat: add typed data files for social links, projects, and experience"
```

---

### Task 5: Social icon components

**Files:**
- Create: `src/components/icons/icons.tsx`

- [ ] **Step 1: Create the icon components**

```tsx
interface IconProps {
  className?: string;
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.4 0 12.07c0 5.34 3.44 9.87 8.21 11.47.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.74-4.04-1.62-4.04-1.62-.55-1.4-1.34-1.78-1.34-1.78-1.09-.76.08-.74.08-.74 1.21.08 1.84 1.25 1.84 1.25 1.07 1.86 2.81 1.32 3.5 1.01.11-.79.42-1.32.76-1.62-2.67-.31-5.47-1.36-5.47-6.03 0-1.33.46-2.42 1.23-3.27-.12-.31-.53-1.55.12-3.23 0 0 1-.33 3.3 1.25a11.3 11.3 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25.65 1.68.24 2.92.12 3.23.77.85 1.23 1.94 1.23 3.27 0 4.68-2.81 5.71-5.49 6.02.43.38.81 1.13.81 2.28 0 1.65-.01 2.98-.01 3.38 0 .32.21.7.83.58A12.06 12.06 0 0 0 24 12.07C24 5.4 18.63 0 12 0Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function EmailIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m4 7 8 5 8-5" />
    </svg>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: exits with status 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/icons/icons.tsx
git commit -m "feat: add inline SVG icon components for social links"
```

---

### Task 6: Footer component

**Files:**
- Create: `src/components/footer/footer.tsx`
- Create: `src/components/footer/footer.css`

- [ ] **Step 1: Create `footer.css`**

```css
.footer {
  border-top: 1px solid var(--color-border);
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.footer__line {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.footer__social {
  display: flex;
  gap: 1rem;
}

.footer__social-link {
  color: var(--color-text-secondary);
  display: inline-flex;
  transition: color 0.15s ease;
}

.footer__social-link:hover,
.footer__social-link:focus-visible {
  color: var(--color-accent-bright);
}
```

- [ ] **Step 2: Create `footer.tsx`**

```tsx
import { socialLinks } from "../../data/social";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "../icons/icons";
import "./footer.css";

const iconComponents = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
};

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__line">
        <span className="section__heading-prompt">$</span> echo "thanks for stopping by"
      </p>
      <div className="footer__social" aria-label="Social links">
        {socialLinks.map((link) => {
          const Icon = iconComponents[link.icon];
          const isExternal = link.icon !== "email";
          return (
            <a
              key={link.id}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              aria-label={link.label}
              className="footer__social-link"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: exits with status 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/footer/footer.tsx src/components/footer/footer.css
git commit -m "feat: add Footer component with sign-off line and social links"
```

---

### Task 7: Header component

**Files:**
- Create: `src/components/header/header.tsx`
- Create: `src/components/header/header.css`

- [ ] **Step 1: Create `header.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.header__bar {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header__prompt {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--color-accent-bright);
  white-space: nowrap;
}

.header__nav {
  display: flex;
  gap: 1.25rem;
  flex: 1;
}

.header__nav-link {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s ease;
}

.header__nav-link:hover,
.header__nav-link:focus-visible {
  color: var(--color-accent-bright);
}

.header__social {
  display: flex;
  gap: 0.9rem;
}

.header__social-link {
  color: var(--color-text-secondary);
  display: inline-flex;
  transition: color 0.15s ease;
}

.header__social-link:hover,
.header__social-link:focus-visible {
  color: var(--color-accent-bright);
}

@media (max-width: 640px) {
  .header__bar {
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .header__nav {
    order: 3;
    width: 100%;
    justify-content: space-between;
  }
}
```

- [ ] **Step 2: Create `header.tsx`**

```tsx
import { socialLinks } from "../../data/social";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "../icons/icons";
import "./header.css";

const navItems = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
];

const iconComponents = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header() {
  return (
    <header className="header">
      <div className="header__bar">
        <span className="header__prompt">roger@portfolio:~$</span>
        <nav className="header__nav" aria-label="Section navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="header__nav-link"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header__social" aria-label="Social links">
          {socialLinks.map((link) => {
            const Icon = iconComponents[link.icon];
            const isExternal = link.icon !== "email";
            return (
              <a
                key={link.id}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                aria-label={link.label}
                className="header__social-link"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: exits with status 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/header/header.tsx src/components/header/header.css
git commit -m "feat: add sticky terminal-style Header with section nav and social links"
```

---

### Task 8: About section

**Files:**
- Create: `src/components/about/about.tsx`
- Create: `src/components/about/about.css`

- [ ] **Step 1: Create `about.css`**

```css
.about__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about__name {
  font-size: 2rem;
  color: var(--color-text-primary);
}

.about__bio {
  max-width: 60ch;
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  font-family: var(--font-body);
  margin: 0;
}
```

- [ ] **Step 2: Create `about.tsx`**

```tsx
import SectionHeading from "../section-heading/section-heading";
import "./about.css";

function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading command="whoami" />
      <div className="about__content">
        <h1 className="about__name">Roger Marvin</h1>
        <p className="about__bio">
          I'm a software engineer who likes building small, focused tools and
          learning by shipping projects end to end. This site is where I keep
          a running log of what I've built.
          <span className="cursor" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}

export default About;
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: exits with status 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/about/about.tsx src/components/about/about.css
git commit -m "feat: add About section with terminal-prompt intro"
```

---

### Task 9: Project card and grid

**Files:**
- Create: `src/components/projects/project-card.tsx`
- Create: `src/components/projects/project-card.css`
- Create: `src/components/projects/project-grid.tsx`
- Create: `src/components/projects/project-grid.css`

- [ ] **Step 1: Create `project-card.css`**

```css
.project-card {
  display: flex;
  flex-direction: column;
  text-align: left;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  color: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.project-card:hover,
.project-card:focus-visible {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.project-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: var(--color-bg);
}

.project-card__image--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 2.5rem;
  color: var(--color-accent-bright);
}

.project-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.project-card__title {
  font-size: 1.05rem;
  color: var(--color-text-primary);
}

.project-card__description {
  margin: 0;
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
}

.project-card__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
}

.project-card__tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-comment);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
}
```

- [ ] **Step 2: Create `project-card.tsx`**

```tsx
import type { Project } from "../../data/projects";
import "./project-card.css";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <button type="button" className="project-card" onClick={() => onSelect(project)}>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="project-card__image"
        />
      ) : (
        <div className="project-card__image project-card__image--placeholder" aria-hidden="true">
          <span>{project.title.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <ul className="project-card__tags">
          {project.tags.map((tag) => (
            <li key={tag} className="project-card__tag">{tag}</li>
          ))}
        </ul>
      </div>
    </button>
  );
}

export default ProjectCard;
```

- [ ] **Step 3: Create `project-grid.css`**

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
```

- [ ] **Step 4: Create `project-grid.tsx`**

This renders the grid and tracks which project (if any) is selected — the modal itself is wired in next task, so for now it just holds the state and renders the grid.

```tsx
import { useState } from "react";
import { projects, type Project } from "../../data/projects";
import ProjectCard from "./project-card";
import "./project-grid.css";

function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
        ))}
      </div>
      {selectedProject !== null && (
        <p className="section__heading">
          <span className="section__heading-prompt">$</span> selected: {selectedProject.title}
          {" "}(modal wired in next task)
        </p>
      )}
    </>
  );
}

export default ProjectGrid;
```

- [ ] **Step 5: Verify in the browser**

Run: `npm run dev`
Open `http://localhost:5173`, scroll to the Projects section. Expected: two sample project cards render in a grid with placeholder letter thumbnails, titles, descriptions, and tag pills; clicking a card shows the temporary "selected: ..." line below the grid.

- [ ] **Step 6: Typecheck and lint**

Run: `npx tsc -b --noEmit && npm run lint`
Expected: both exit with status 0.

- [ ] **Step 7: Commit**

```bash
git add src/components/projects/project-card.tsx src/components/projects/project-card.css \
        src/components/projects/project-grid.tsx src/components/projects/project-grid.css
git commit -m "feat: add ProjectCard and ProjectGrid with selection state"
```

---

### Task 10: Project modal

**Files:**
- Create: `src/components/projects/project-modal.tsx`
- Create: `src/components/projects/project-modal.css`
- Modify: `src/components/projects/project-grid.tsx`

- [ ] **Step 1: Create `project-modal.css`**

```css
.project-modal__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(13, 17, 23, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 100;
}

.project-modal {
  width: min(560px, 100%);
  max-height: 85vh;
  overflow-y: auto;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-accent);
  border-radius: 6px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.project-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.75rem;
}

.project-modal__prompt {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-accent-bright);
}

.project-modal__close {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 1rem;
  cursor: pointer;
  line-height: 1;
}

.project-modal__close:hover,
.project-modal__close:focus-visible {
  color: var(--color-text-primary);
}

.project-modal__title {
  font-size: 1.3rem;
  color: var(--color-text-primary);
}

.project-modal__description {
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  line-height: 1.6;
}

.project-modal__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
}

.project-modal__tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-comment);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
}

.project-modal__links {
  display: flex;
  gap: 1.25rem;
}

.project-modal__link {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-accent-bright);
}

.project-modal__link:hover,
.project-modal__link:focus-visible {
  text-decoration: underline;
}
```

- [ ] **Step 2: Create `project-modal.tsx`**

```tsx
import { useEffect } from "react";
import type { Project } from "../../data/projects";
import "./project-modal.css";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="project-modal__backdrop" onClick={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="project-modal__header">
          <span className="project-modal__prompt">$ cat {project.id}.md</span>
          <button type="button" className="project-modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <h3 id="project-modal-title" className="project-modal__title">{project.title}</h3>
        <p className="project-modal__description">{project.description}</p>
        <ul className="project-modal__tags">
          {project.tags.map((tag) => (
            <li key={tag} className="project-modal__tag">{tag}</li>
          ))}
        </ul>
        <div className="project-modal__links">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="project-modal__link">
              View live →
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noreferrer" className="project-modal__link">
              View repo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
```

- [ ] **Step 3: Wire the modal into `project-grid.tsx`**

Replace the full contents of `src/components/projects/project-grid.tsx` with:

```tsx
import { useState } from "react";
import { projects, type Project } from "../../data/projects";
import ProjectCard from "./project-card";
import ProjectModal from "./project-modal";
import "./project-grid.css";

function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
        ))}
      </div>
      {selectedProject !== null && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}

export default ProjectGrid;
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`
Open `http://localhost:5173`, scroll to Projects, click a card. Expected: a modal overlay opens showing the project's full description, tags, and links; it closes when you click the ✕ button, click the dark backdrop, or press `Esc`.

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc -b --noEmit && npm run lint`
Expected: both exit with status 0.

- [ ] **Step 6: Commit**

```bash
git add src/components/projects/project-modal.tsx src/components/projects/project-modal.css \
        src/components/projects/project-grid.tsx
git commit -m "feat: add ProjectModal with backdrop/Esc dismissal and wire it into ProjectGrid"
```

---

### Task 11: Experience timeline

**Files:**
- Create: `src/components/experience/timeline.tsx`
- Create: `src/components/experience/timeline.css`

- [ ] **Step 1: Create `timeline.css`**

```css
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: 2px solid var(--color-border);
}

.timeline__entry {
  position: relative;
  padding: 0 0 2rem 1.75rem;
}

.timeline__entry:last-child {
  padding-bottom: 0;
}

.timeline__marker {
  position: absolute;
  left: -7px;
  top: 0.4rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 2px solid var(--color-bg);
}

.timeline__period {
  margin: 0 0 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-comment);
}

.timeline__role {
  font-size: 1.1rem;
  color: var(--color-text-primary);
}

.timeline__organization {
  margin: 0.15rem 0 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-accent-bright);
}

.timeline__description {
  margin: 0 0 0.6rem;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  line-height: 1.6;
}

.timeline__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
}

.timeline__tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-comment);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
}
```

- [ ] **Step 2: Create `timeline.tsx`**

```tsx
import { experience } from "../../data/experience";
import "./timeline.css";

function Timeline() {
  return (
    <ol className="timeline">
      {experience.map((entry) => (
        <li key={entry.id} className="timeline__entry">
          <div className="timeline__marker" aria-hidden="true" />
          <div className="timeline__content">
            <p className="timeline__period">{entry.period}</p>
            <h3 className="timeline__role">{entry.role}</h3>
            <p className="timeline__organization">{entry.organization}</p>
            <p className="timeline__description">{entry.description}</p>
            {entry.tags && (
              <ul className="timeline__tags">
                {entry.tags.map((tag) => (
                  <li key={tag} className="timeline__tag">{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
```

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc -b --noEmit && npm run lint`
Expected: both exit with status 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/experience/timeline.tsx src/components/experience/timeline.css
git commit -m "feat: add Experience Timeline component"
```

---

### Task 12: Assemble App and final verification

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/App.tsx` to assemble all sections**

```tsx
import Header from "./components/header/header";
import About from "./components/about/about";
import ProjectGrid from "./components/projects/project-grid";
import Timeline from "./components/experience/timeline";
import Footer from "./components/footer/footer";
import SectionHeading from "./components/section-heading/section-heading";

function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <section id="projects" className="section">
          <SectionHeading command="ls projects/" />
          <ProjectGrid />
        </section>
        <section id="experience" className="section">
          <SectionHeading command="cat resume.log" />
          <Timeline />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
```

- [ ] **Step 2: Full verification pass**

Run: `npx tsc -b --noEmit && npm run lint && npm run build`
Expected: all three commands exit with status 0; `npm run build` produces a `dist/` directory with no errors.

- [ ] **Step 3: Manual browser walkthrough**

Run: `npm run dev`
Open `http://localhost:5173` and check:
- Clicking `about`, `projects`, `experience` in the header nav smooth-scrolls to each section.
- The About section shows the intro with a blinking cursor.
- The Projects grid shows both sample cards; clicking one opens the modal, and the modal closes via ✕, backdrop click, and `Esc`.
- The Experience section renders both sample entries as a connected vertical timeline.
- The footer shows the sign-off line and social icons.
- Resize the browser to a narrow (mobile) width — header nav and project grid should reflow without overlapping content.
- In your OS accessibility settings, enable "reduce motion", reload the page, and confirm the cursor stops blinking and scrolling becomes instant.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: assemble About, Projects, and Experience sections into App"
```

---

## Done

At this point the site is a complete, working terminal-themed single-page portfolio with placeholder content. Next steps (outside this plan) are content edits only: replace the sample entries in `src/data/projects.ts` and `src/data/experience.ts` with real projects/history, update the placeholder URLs in `src/data/social.ts`, and swap in a real bio in `src/components/about/about.tsx`.
