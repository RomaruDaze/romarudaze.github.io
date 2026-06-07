# Terminal-themed personal portfolio — design spec

Date: 2026-06-07

## Purpose

Rebuild the personal site (romarudaze.github.io) from scratch as a project
showcase with a "Claude Code"-inspired terminal aesthetic. The previous
implementation was wiped down to a blank Vite + React + TypeScript scaffold;
this spec describes what gets built on top of it.

## Goals

- Showcase projects as the primary focus, with an easy way to add new ones
  over time without touching component code.
- Give visitors enough context about who you are (About) and your background
  (Experience/Resume) without leaving the page.
- Present everything through a cohesive dark, terminal/code-editor-inspired
  visual identity built around the accent color `#353fbd`.

## Non-goals

- No multi-page routing — this is a single scrolling page.
- No contact form, newsletter, blog, or CMS — contact is just icon links.
- No backend — fully static site deployed via GitHub Pages (existing
  `gh-pages` deploy script).

## Tech stack & dependency cleanup

Keep: React 18, Vite, TypeScript, ESLint (existing scaffold).

Remove from `package.json` (no longer fit the design or are unused):
`bootstrap`, `@fortawesome/fontawesome-svg-core`,
`@fortawesome/free-brands-svg-icons`, `@fortawesome/free-regular-svg-icons`,
`@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`,
`react-router-dom`, `axios`, `emailjs-com`, `dotenv`.

Add: JetBrains Mono (via Google Fonts `<link>` in `index.html`) as the
monospace webfont, paired with a clean sans-serif (e.g. Inter) for longer
body copy.
Social icons are small inline SVGs — no icon library needed for ~3 icons.

## Page structure

Single scrolling page with smooth-scroll navigation between sections (no
routing). Sections, top to bottom:

1. **Top bar** (sticky) — terminal title-bar styling showing your
   name/handle (e.g. `roger@portfolio:~$`), nav links that scroll to each
   section (`about`, `projects`, `experience`), and social icon links
   (email, GitHub, LinkedIn) aligned right.
2. **About / Hero** — short bio presented as a terminal interaction, e.g. a
   `$ whoami` prompt line followed by a few lines of intro text, with a
   blinking-cursor accent.
3. **Projects** — section header styled like `$ ls projects/`, followed by a
   responsive grid of project cards. Clicking a card opens a modal with the
   fuller write-up, tags, and links (see "Projects" below).
4. **Experience** — section header styled like `$ cat resume.log`, rendered
   as a vertical timeline of roles/education (reusing the timeline concept
   from the previous design, restyled to the new theme).
5. **Footer** — minimal sign-off line (e.g. `$ echo "thanks for stopping
   by"`) plus a repeat of the social icon links.

## Visual theme

- **Background**: near-black terminal tones (roughly `#0d1117`–`#1a1b26`
  range) rather than pure black.
- **Primary accent**: `#353fbd`, used the way an editor uses syntax
  highlighting — links, headings, prompt symbols (`$`), card borders/hovers,
  the blinking cursor.
- **Secondary accents**: one or two complementary syntax-highlight tones
  (e.g. a soft green for "string/success" and a muted amber for
  "comment/secondary text") so the palette doesn't feel flat.
- **Typography**: JetBrains Mono for headings, prompts, nav, and
  code-styled UI elements; Inter (or similar clean sans-serif) for longer
  body text (bio, project descriptions) so extended reading isn't fatiguing.
- **Terminal motifs**: `$` prompt prefixes on section headers, a blinking
  cursor accent near the intro text, project/experience cards framed like
  code blocks. Kept tasteful and restrained — no heavy scanline/glow effects.
- Respect `prefers-reduced-motion` for any animation (cursor blink, smooth
  scroll, hover transitions).

## Projects: data & components

Data lives in `src/data/projects.ts`, exporting a typed array. Adding a new
project means adding one object — no component changes required:

```ts
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    live?: string;
    repo?: string;
  };
}
```

Components (in `src/components/projects/`):

- `ProjectGrid` — responsive CSS grid laying out `ProjectCard`s, reading from
  the `projects.ts` data file.
- `ProjectCard` — thumbnail, title, short blurb, tag pills; click opens
  `ProjectModal` for that project.
- `ProjectModal` — overlay showing the full description, tags, and live/repo
  links, styled like an expanded code block. Closes on backdrop click or
  `Esc`.

## Experience: data & components

Mirrors the projects pattern — data lives in `src/data/experience.ts`:

```ts
interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}
```

Rendered by a restyled `Timeline` component (in
`src/components/experience/`) as a vertical list of entries with
connecting lines/markers in the terminal theme.

## Folder structure

Feature-grouped, flat-ish:

```
src/
  components/
    header/        — sticky top bar, nav, social links
    about/         — hero/intro section
    projects/      — ProjectGrid, ProjectCard, ProjectModal
    experience/    — Timeline section
    footer/
  data/
    projects.ts
    experience.ts
  assets/          — images, fonts (as needed)
  App.tsx
  main.tsx
  index.css        — global styles, CSS custom properties for theme tokens
```

Theme colors and fonts are defined as CSS custom properties (e.g.
`--color-bg`, `--color-accent`, `--font-mono`, `--font-body`) in `index.css`
or a dedicated tokens file, so the palette stays centralized and easy to
adjust.

## Testing / verification

- `npm run lint` and `tsc -b` must pass cleanly.
- Manually verify in a browser: smooth-scroll nav works, project modal
  opens/closes (click + `Esc` + backdrop), responsive layout at mobile/
  tablet/desktop widths, `prefers-reduced-motion` disables animation.
- Run `npm run build` to confirm the production build succeeds before
  deploying via the existing `npm run build:deploy` script.
