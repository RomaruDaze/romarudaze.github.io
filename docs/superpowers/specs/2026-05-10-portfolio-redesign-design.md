---
title: Portfolio Full Redesign — Clean Minimal with Skills & Experience
date: 2026-05-10
status: approved
---

## Overview

Full redesign of romarudaze.github.io across all four pages (Home, Resume, Projects, Contacts) in a Clean Minimal / Light style. The Home page gains two new sections: Skills and Experience. A shared design token file establishes the visual system used by all pages.

---

## Design System (Tokens)

A single `src/assets/styles/tokens.css` file defines all design values. All components reference these variables — no hardcoded color or font values in component CSS.

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FAFAFA` | Page background |
| `--color-surface` | `#FFFFFF` | Card / panel surfaces |
| `--color-border` | `#E5E7EB` | All borders and dividers |
| `--color-border-subtle` | `#F3F4F6` | Section dividers |
| `--color-text-primary` | `#111827` | Headings, body |
| `--color-text-muted` | `#6B7280` | Secondary text |
| `--color-text-faint` | `#9CA3AF` | Labels, timestamps |
| `--color-accent` | `#2563EB` | Links, CTAs, highlights |
| `--color-tag-lang-bg` | `#F9FAFB` | Language tag background |
| `--color-tag-lang-border` | `#E5E7EB` | Language tag border |
| `--color-tag-fw-bg` | `#EFF6FF` | Framework tag background |
| `--color-tag-fw-border` | `#BFDBFE` | Framework tag border |
| `--color-tag-fw-text` | `#1D4ED8` | Framework tag text |
| `--color-tag-cloud-bg` | `#F0FDF4` | Cloud/DB tag background |
| `--color-tag-cloud-border` | `#BBF7D0` | Cloud/DB tag border |
| `--color-tag-cloud-text` | `#166534` | Cloud/DB tag text |
| `--font-heading` | `'Archivo', sans-serif` | All headings |
| `--font-body` | `'Space Grotesk', sans-serif` | Body text, UI labels |
| `--radius-sm` | `4px` | Tags, small elements |
| `--radius-md` | `8px` | Cards |
| `--radius-lg` | `10px` | Large cards |
| `--radius-pill` | `20px` | Badge/pill labels |

Google Fonts import (both weights 300–700):
```
https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700
```

---

## Architecture

### Approach: Design System First (Token-based)

1. Create `src/assets/styles/tokens.css` with all CSS variables above.
2. Import it once in `src/index.css` (already the global stylesheet).
3. Rewrite each component's `.css` file to reference tokens only.
4. Add two new components: `Skills` and `Experience`, added to the Home `Body`.

### New Components

| Component | File | Purpose |
|---|---|---|
| `Skills` | `src/components/home/skills/skills.tsx` + `skills.css` | Skills tags grouped by category |
| `Experience` | `src/components/home/experience/experience.tsx` + `experience.css` | Vertical timeline of work history |

### Modified Components

| Component | Change |
|---|---|
| `Header` | Clean minimal nav — white/translucent bg, Archivo font, no opacity gimmick on scroll (keep subtle shadow instead) |
| `Home (Hero)` | New layout: status badge, large name, role subtitle, two CTA buttons (View Projects, Contact Me) |
| `About` | Compact horizontal layout: profile pic left, bio + Resume link right |
| `Projects (home preview)` | 2-col card grid, keep existing flip animation, apply minimal card styling (white bg, border, no heavy shadows) |
| `Resume` | Profile header + redesigned timeline, social links as bordered tags |
| `Projects (page)` | 2-col card grid, color-coded language tags, GitHub button per card |
| `Contacts` | Social link cards (Email, LinkedIn, GitHub, Instagram, X) + contact form |
| `Footer` | Minimal: name + social icons inline, copyright |

---

## Home Page — Section Order

1. **Hero** — Name ("Roger Marvin"), role ("Software Engineer"), "Indonesia → Japan" subline, "Code. Create. Conquer." tagline, two buttons: "View Projects" (filled) and "Contact Me" (outlined).
2. **About** — Profile photo left, bio paragraph right, "Full Resume →" link in accent blue.
3. **Skills** *(new)* — Five tag groups:
   - **Languages**: Python, HTML, CSS, Java, JavaScript, TypeScript (neutral tags)
   - **Frameworks**: React, Spring Boot, Flutter, Vite (blue tags)
   - **Cloud & Deployment**: AWS, GCP, Vercel, Netlify, Render, Firebase (green tags)
   - **Databases & Tools**: PostgreSQL, NoSQL, SQLite, SheetDB, GAS, Git, IntelliJ, Cursor, Claude Code (neutral tags)
   - **Design**: Design Thinking, HCD/UCD (neutral tags)
4. **Experience** *(new)* — Vertical dot-and-line timeline, newest first:
   - Rakus — Software Engineer · Current (filled black dot + "Current" badge)
   - Beenos.inc — System Engineer · 1 year · AI integration with Python & AWS
   - NEC — Intern · 3 months · Solution development via Design Thinking
   - Nadus Works — Intern · 1 month · Office efficiency software
5. **Projects preview** — 2-col card grid showing all 4 projects, "View all →" link to /projects page.
6. **Contact teaser** — Single-line CTA row linking to /contacts.

---

## Resume Page

- Profile header: photo (left), name + "Software Engineer" in accent blue, bio paragraph, social link tags (LinkedIn, GitHub, Instagram, X).
- Full career timeline matching the Experience section content above, with expanded one-line descriptions per role.
- Bottom bar: "Want to connect?" + email link.
- Existing `Timeline` component is refactored to match the new minimal dot-line style.

---

## Projects Page

- Page title "My Projects" + subtitle "Things I've built".
- 2-column card grid (existing 4 projects: SeleniumType, TDL, DokoTabe, APReader).
- Each card: banner image, project name, description, color-coded language bar (existing `LanguageBar` component kept), "GitHub →" link in accent blue.
- Flip card animation is removed — cards are flat with a subtle border hover effect instead (cleaner, more minimal).
- Language fetch from GitHub API is kept as-is.

---

## Contacts Page

- Heading "Get in Touch" + subtitle.
- Social link cards (clickable rows): Email, LinkedIn, GitHub, Instagram, X — each with icon, label, handle, and "→" arrow.
- Contact form: Name, Email, Message fields + Send button. Keeps existing EmailJS integration.

---

## Header & Footer

**Header**: White background with `backdrop-filter: blur(8px)`, `border-bottom: 1px solid var(--color-border)`. Nav links in `--color-text-muted`, active page link in `--color-text-primary`. Logo "RomaruDaze" in bold Archivo. Remove the scroll-opacity effect; replace with a subtle box-shadow on scroll.

**Footer**: Single row — "© 2026 Roger Marvin" left, FontAwesome social icon links right. Minimal, no heavy background.

---

## Animation & Interaction

- Keep existing `fadeIn` and `rise-up` scroll-triggered animations — they match the minimal style.
- All card hover states: `border-color` transition to `--color-accent` at 200ms, no scale transforms.
- All clickable elements have `cursor: pointer`.
- Respect `prefers-reduced-motion`: wrap all animations in the media query.

---

## Accessibility

- All images keep descriptive `alt` text.
- Form inputs have associated `<label>` elements.
- Color contrast minimum 4.5:1 for all text (monochrome palette naturally satisfies this).
- Focus rings visible on all interactive elements.
- Tab order matches visual order.

---

## Out of Scope

- Dark mode toggle (deferred).
- Adding new projects beyond the existing four.
- CV/PDF download link (can be added later via Resume page CTA).
- Internationalization.
