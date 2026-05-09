# Portfolio Full Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all four pages of romarudaze.github.io in a Clean Minimal / Light style, adding new Skills and Experience sections to the Home page, using a shared design token system.

**Architecture:** A single `tokens.css` file defines all CSS variables; every component CSS file references only those tokens. Two new components (`Skills`, `Experience`) are added to the Home `Body`. All pages are restyled to match the minimal aesthetic.

**Tech Stack:** React 18, TypeScript, Vite, React Router (HashRouter), FontAwesome, EmailJS, CSS Modules (plain CSS per component)

---

## File Map

**Create:**
- `src/assets/styles/tokens.css` — all CSS design variables
- `src/components/home/skills/skills.tsx` + `skills.css` — skills tag groups
- `src/components/home/experience/experience.tsx` + `experience.css` — work history timeline

**Modify:**
- `src/index.css` — reset global styles, import tokens + Google Fonts
- `src/App.tsx` — remove scroll-opacity handler, remove `opacity` prop
- `src/components/header/header.tsx` + `header.css` — logo + minimal nav
- `src/components/footer/footer.tsx` + `footer.css` — minimal single-row footer
- `src/components/home/body.tsx` — add Skills and Experience between About and Projects
- `src/components/home/home/home.tsx` + `home.css` — hero section
- `src/components/home/about/about.tsx` + `about.css` — horizontal layout
- `src/components/home/projects/projects.tsx` + `projects.css` — minimal card grid
- `src/components/home/contact/contact.tsx` + `contact.css` — CTA teaser row
- `src/components/resume/resume.tsx` + `resume.css` — profile header redesign
- `src/components/resume/timeline/timeline.tsx` + `timeline.css` — minimal dot-line timeline
- `src/components/projects/projects.tsx` + `projects.css` — flat card grid (no flip)
- `src/components/contacts/contacts.tsx` + `contacts.css` — social link cards + form

---

## Task 1: Design Token Foundation

**Files:**
- Create: `src/assets/styles/tokens.css`
- Modify: `src/index.css`

- [ ] **Step 1: Create `src/assets/styles/tokens.css`**

```css
:root {
  /* Colors */
  --color-bg: #fafafa;
  --color-surface: #ffffff;
  --color-border: #e5e7eb;
  --color-border-subtle: #f3f4f6;
  --color-text-primary: #111827;
  --color-text-muted: #6b7280;
  --color-text-faint: #9ca3af;
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;

  /* Tag: neutral (Languages, Databases & Tools, Design) */
  --color-tag-neutral-bg: #f9fafb;
  --color-tag-neutral-border: #e5e7eb;
  --color-tag-neutral-text: #374151;

  /* Tag: blue (Frameworks) */
  --color-tag-fw-bg: #eff6ff;
  --color-tag-fw-border: #bfdbfe;
  --color-tag-fw-text: #1d4ed8;

  /* Tag: green (Cloud & Deployment) */
  --color-tag-cloud-bg: #f0fdf4;
  --color-tag-cloud-border: #bbf7d0;
  --color-tag-cloud-text: #166534;

  /* Typography */
  --font-heading: 'Archivo', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-pill: 20px;

  /* Spacing */
  --section-padding: 48px 24px;
  --section-padding-sm: 32px 24px;
}
```

- [ ] **Step 2: Replace `src/index.css` entirely**

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import './assets/styles/tokens.css';

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
  font-family: var(--font-heading);
  line-height: 1.2;
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  font-family: var(--font-body);
}

img {
  max-width: 100%;
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes riseUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.rise-up {
  animation: riseUp 0.5s ease forwards;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Run dev server to confirm no crashes**

```bash
npm run dev
```

Expected: Dev server starts, page loads (may look broken visually — that's fine, we're rebuilding one component at a time).

- [ ] **Step 4: Commit**

```bash
git add src/assets/styles/tokens.css src/index.css
git commit -m "feat: add design token system and reset global CSS"
```

---

## Task 2: Header Redesign

**Files:**
- Modify: `src/components/header/header.tsx`
- Modify: `src/components/header/header.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `src/App.tsx` — remove scroll-opacity logic**

```tsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/fonts/font-roboto.css";
import Header from "./components/header/header";
import Body from "./components/home/body";
import Resume from "./components/resume/resume";
import Projects from "./components/projects/projects";
import Contacts from "./components/contacts/contacts";
import Footer from "./components/footer/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
```

- [ ] **Step 2: Replace `src/components/header/header.tsx`**

```tsx
import { Link, useLocation } from "react-router-dom";
import "./header.css";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">RomaruDaze</Link>
        <nav className="header-nav">
          {[
            { to: "/", label: "Home" },
            { to: "/resume", label: "Resume" },
            { to: "/projects", label: "Projects" },
            { to: "/contacts", label: "Contacts" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`header-link ${pathname === to ? "header-link--active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
```

- [ ] **Step 3: Replace `src/components/header/header.css`**

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(250, 250, 250, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
  transition: box-shadow 0.2s ease;
}

.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.header-nav {
  display: flex;
  gap: 4px;
}

.header-link {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  transition: color 0.15s ease, background 0.15s ease;
}

.header-link:hover {
  color: var(--color-text-primary);
  background: var(--color-border-subtle);
}

.header-link--active {
  color: var(--color-text-primary);
  font-weight: 600;
}
```

- [ ] **Step 4: Verify header renders correctly**

```bash
npm run dev
```

Expected: Fixed minimal white/translucent header with "RomaruDaze" logo left, nav links right. Active page link is bold.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/header/header.tsx src/components/header/header.css
git commit -m "feat: redesign header with minimal style and active nav state"
```

---

## Task 3: Footer Redesign

**Files:**
- Modify: `src/components/footer/footer.tsx`
- Modify: `src/components/footer/footer.css`

- [ ] **Step 1: Replace `src/components/footer/footer.tsx`**

```tsx
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">© 2026 Roger Marvin</span>
        <div className="footer-icons">
          <a href="https://linkedin.com/in/roger-marvin-78659b302/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/RomaruDaze" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://instagram.com/romaru._" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://x.com/RomaruDaze" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 2: Replace `src/components/footer/footer.css`**

```css
.footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
  margin-top: auto;
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-copy {
  font-size: 12px;
  color: var(--color-text-faint);
}

.footer-icons {
  display: flex;
  gap: 16px;
}

.footer-icons a {
  color: var(--color-text-faint);
  font-size: 15px;
  transition: color 0.15s ease;
  cursor: pointer;
}

.footer-icons a:hover {
  color: var(--color-text-primary);
}
```

- [ ] **Step 3: Verify footer renders**

```bash
npm run dev
```

Expected: Minimal single-row footer — copyright left, four social icons right.

- [ ] **Step 4: Commit**

```bash
git add src/components/footer/footer.tsx src/components/footer/footer.css
git commit -m "feat: redesign footer with minimal single-row layout"
```

---

## Task 4: Home Hero Section

**Files:**
- Modify: `src/components/home/home/home.tsx`
- Modify: `src/components/home/home/home.css`

- [ ] **Step 1: Replace `src/components/home/home/home.tsx`**

```tsx
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div
        className="hero-inner"
        style={{ opacity: 0, animation: "fadeIn 0.8s ease forwards" }}
      >
        <span className="hero-badge">Available for opportunities</span>
        <h1 className="hero-name">Roger Marvin</h1>
        <p className="hero-role">Software Engineer · Indonesia → Japan</p>
        <p
          className="hero-tagline"
          style={{
            opacity: 0,
            animation: "fadeIn 0.8s ease forwards",
            animationDelay: "0.4s",
          }}
        >
          Code. Create. Conquer.
        </p>
        <div
          className="hero-actions"
          style={{
            opacity: 0,
            animation: "fadeIn 0.8s ease forwards",
            animationDelay: "0.8s",
          }}
        >
          <Link to="/projects" className="btn btn-primary">View Projects</Link>
          <Link to="/contacts" className="btn btn-secondary">Contact Me</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
```

- [ ] **Step 2: Replace `src/components/home/home/home.css`**

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: 80px 24px 48px;
  border-bottom: 1px solid var(--color-border-subtle);
}

.hero-inner {
  text-align: center;
  max-width: 560px;
}

.hero-badge {
  display: inline-block;
  background: var(--color-border-subtle);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: var(--radius-pill);
  margin-bottom: 20px;
}

.hero-name {
  font-family: var(--font-heading);
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.03em;
  margin-bottom: 8px;
}

.hero-role {
  font-size: 15px;
  color: var(--color-text-muted);
  margin: 0 0 8px;
}

.hero-tagline {
  font-size: 13px;
  color: var(--color-text-faint);
  letter-spacing: 0.04em;
  margin: 0 0 32px;
}

.hero-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 10px 22px;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--color-text-primary);
  color: #ffffff;
  border: 1px solid var(--color-text-primary);
}

.btn-primary:hover {
  background: #1f2937;
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  border-color: var(--color-text-primary);
}
```

- [ ] **Step 3: Verify hero section**

```bash
npm run dev
```

Expected: Full-height hero with badge, large name, role, tagline, two buttons — fades in on load.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/home/home.tsx src/components/home/home/home.css
git commit -m "feat: redesign hero section with minimal clean layout"
```

---

## Task 5: About Section Update

**Files:**
- Modify: `src/components/home/about/about.tsx`
- Modify: `src/components/home/about/about.css`

- [ ] **Step 1: Replace `src/components/home/about/about.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";
import "./about.css";
import profilePicture from "../../../assets/images/pictures/profile-picture.png";
import { Link } from "react-router-dom";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`about ${isVisible ? "rise-up" : ""}`}
      ref={ref}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div className="about-inner">
        <img src={profilePicture} alt="Roger Marvin" className="about-photo" />
        <div className="about-content">
          <span className="section-label">About</span>
          <h2 className="about-name">Roger Marvin</h2>
          <p className="about-bio">
            22-year-old software engineer from <strong>Indonesia</strong>, studying abroad in{" "}
            <strong>Japan</strong>. Passionate about Digital Transformation and building
            solutions that make a difference.
          </p>
          <Link to="/resume" className="about-link">Full Resume →</Link>
        </div>
      </div>
    </section>
  );
}

export default About;
```

- [ ] **Step 2: Replace `src/components/home/about/about.css`**

```css
.about {
  padding: var(--section-padding-sm);
  border-bottom: 1px solid var(--color-border-subtle);
  max-width: 960px;
  margin: 0 auto;
}

.about-inner {
  display: flex;
  align-items: center;
  gap: 24px;
}

.about-photo {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--color-border);
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-faint);
}

.about-name {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.about-bio {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
  max-width: 520px;
}

.about-bio strong {
  color: var(--color-text-primary);
  font-weight: 600;
}

.about-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  transition: color 0.15s ease;
  align-self: flex-start;
}

.about-link:hover {
  color: var(--color-accent-hover);
}

@media (max-width: 480px) {
  .about-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

- [ ] **Step 3: Verify About section**

```bash
npm run dev
```

Expected: Horizontal layout — photo left, bio right. Fades in when scrolled into view.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/about/about.tsx src/components/home/about/about.css
git commit -m "feat: redesign About section with horizontal minimal layout"
```

---

## Task 6: New Skills Component

**Files:**
- Create: `src/components/home/skills/skills.tsx`
- Create: `src/components/home/skills/skills.css`

- [ ] **Step 1: Create `src/components/home/skills/skills.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";
import "./skills.css";

type TagVariant = "neutral" | "framework" | "cloud";

interface SkillGroup {
  label: string;
  variant: TagVariant;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Languages",
    variant: "neutral",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "HTML", "CSS"],
  },
  {
    label: "Frameworks",
    variant: "framework",
    skills: ["React", "Spring Boot", "Flutter", "Vite"],
  },
  {
    label: "Cloud & Deployment",
    variant: "cloud",
    skills: ["AWS", "GCP", "Vercel", "Netlify", "Render", "Firebase"],
  },
  {
    label: "Databases & Tools",
    variant: "neutral",
    skills: ["PostgreSQL", "NoSQL", "SQLite", "SheetDB", "GAS", "Git", "IntelliJ", "Cursor", "Claude Code"],
  },
  {
    label: "Design",
    variant: "neutral",
    skills: ["Design Thinking", "HCD/UCD"],
  },
];

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`skills ${isVisible ? "rise-up" : ""}`}
      ref={ref}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div className="skills-inner">
        <span className="section-label">Skills</span>
        <div className="skills-groups">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="skill-group">
              <span className="skill-group-label">{group.label}</span>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className={`skill-tag skill-tag--${group.variant}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
```

- [ ] **Step 2: Create `src/components/home/skills/skills.css`**

```css
.skills {
  padding: var(--section-padding-sm);
  border-bottom: 1px solid var(--color-border-subtle);
  max-width: 960px;
  margin: 0 auto;
}

.skills-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skills-groups {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.skill-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skill-group-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  border: 1px solid;
}

.skill-tag--neutral {
  background: var(--color-tag-neutral-bg);
  border-color: var(--color-tag-neutral-border);
  color: var(--color-tag-neutral-text);
}

.skill-tag--framework {
  background: var(--color-tag-fw-bg);
  border-color: var(--color-tag-fw-border);
  color: var(--color-tag-fw-text);
}

.skill-tag--cloud {
  background: var(--color-tag-cloud-bg);
  border-color: var(--color-tag-cloud-border);
  color: var(--color-tag-cloud-text);
}
```

- [ ] **Step 3: Commit (component not yet wired into Body — will be in Task 8)**

```bash
git add src/components/home/skills/skills.tsx src/components/home/skills/skills.css
git commit -m "feat: add Skills component with grouped color-coded tags"
```

---

## Task 7: New Experience Component

**Files:**
- Create: `src/components/home/experience/experience.tsx`
- Create: `src/components/home/experience/experience.css`

- [ ] **Step 1: Create `src/components/home/experience/experience.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";
import "./experience.css";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
  isCurrent?: boolean;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Rakus",
    role: "Software Engineer",
    duration: "Current",
    description: "",
    isCurrent: true,
  },
  {
    company: "Beenos.inc",
    role: "System Engineer",
    duration: "1 year",
    description: "AI integration into existing systems using Python and AWS.",
  },
  {
    company: "NEC",
    role: "Intern",
    duration: "3 months",
    description: "Developed solutions using Design Thinking methodology.",
  },
  {
    company: "Nadus Works",
    role: "Intern",
    duration: "1 month",
    description: "Built software to improve office workflow efficiency.",
  },
];

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`experience ${isVisible ? "rise-up" : ""}`}
      ref={ref}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div className="experience-inner">
        <span className="section-label">Experience</span>
        <div className="exp-timeline">
          {EXPERIENCES.map((item, index) => (
            <div key={item.company} className="exp-item">
              <div className="exp-track">
                <div className={`exp-dot ${item.isCurrent ? "exp-dot--current" : ""}`} />
                {index < EXPERIENCES.length - 1 && <div className="exp-line" />}
              </div>
              <div className="exp-content">
                <div className="exp-header">
                  <span className="exp-company">{item.company}</span>
                  {item.isCurrent && <span className="exp-badge">Current</span>}
                </div>
                <p className="exp-meta">
                  {item.role} · {item.duration}
                  {item.description && ` · ${item.description}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
```

- [ ] **Step 2: Create `src/components/home/experience/experience.css`**

```css
.experience {
  padding: var(--section-padding-sm);
  border-bottom: 1px solid var(--color-border-subtle);
  max-width: 960px;
  margin: 0 auto;
}

.experience-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exp-timeline {
  display: flex;
  flex-direction: column;
}

.exp-item {
  display: flex;
  gap: 14px;
}

.exp-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 12px;
}

.exp-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  flex-shrink: 0;
  margin-top: 4px;
}

.exp-dot--current {
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
}

.exp-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin: 4px 0;
  min-height: 20px;
}

.exp-content {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.exp-item:last-child .exp-content {
  padding-bottom: 0;
}

.exp-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.exp-company {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.exp-badge {
  background: var(--color-text-primary);
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.04em;
}

.exp-meta {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/experience/experience.tsx src/components/home/experience/experience.css
git commit -m "feat: add Experience component with dot-line timeline"
```

---

## Task 8: Wire Home Body + Projects Preview Update

**Files:**
- Modify: `src/components/home/body.tsx`
- Modify: `src/components/home/projects/projects.tsx`
- Modify: `src/components/home/projects/projects.css`
- Modify: `src/components/home/contact/contact.tsx`
- Modify: `src/components/home/contact/contact.css`

- [ ] **Step 1: Replace `src/components/home/body.tsx`**

```tsx
import { useEffect } from "react";
import Home from "./home/home";
import About from "./about/about";
import Skills from "./skills/skills";
import Experience from "./experience/experience";
import Projects from "./projects/projects";
import Contact from "./contact/contact";

function Body() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Home />
      <div className="home-sections">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default Body;
```

- [ ] **Step 2: Replace `src/components/home/projects/projects.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";
import "./projects.css";
import TDL from "../../../assets/images/pictures/tdl-banner.png";
import SeleniumType from "../../../assets/images/pictures/seltype-banner.png";
import DokoTabe from "../../../assets/images/pictures/dokotabe-banner.png";
import APReader from "../../../assets/images/pictures/apreader-banner.png";
import { Link } from "react-router-dom";

const PREVIEW_PROJECTS = [
  { name: "SeleniumType", img: SeleniumType, tags: ["Python", "Selenium"] },
  { name: "TDL", img: TDL, tags: ["Flutter", "Dart"] },
  { name: "DokoTabe", img: DokoTabe, tags: ["React", "Firebase"] },
  { name: "APReader", img: APReader, tags: ["Python"] },
];

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`projects-home ${isVisible ? "rise-up" : ""}`}
      ref={ref}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div className="projects-home-inner">
        <div className="projects-home-header">
          <span className="section-label">Projects</span>
          <Link to="/projects" className="projects-home-viewall">View all →</Link>
        </div>
        <div className="projects-home-grid">
          {PREVIEW_PROJECTS.map((project) => (
            <Link to="/projects" key={project.name} className="projects-home-card">
              <img src={project.img} alt={project.name} className="projects-home-img" />
              <div className="projects-home-card-body">
                <span className="projects-home-name">{project.name}</span>
                <div className="projects-home-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="skill-tag skill-tag--neutral">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
```

- [ ] **Step 3: Replace `src/components/home/projects/projects.css`**

```css
.projects-home {
  padding: var(--section-padding-sm);
  border-bottom: 1px solid var(--color-border-subtle);
  max-width: 960px;
  margin: 0 auto;
}

.projects-home-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.projects-home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.projects-home-viewall {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  transition: color 0.15s ease;
  cursor: pointer;
}

.projects-home-viewall:hover {
  color: var(--color-accent-hover);
}

.projects-home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.projects-home-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease;
  text-decoration: none;
  display: block;
}

.projects-home-card:hover {
  border-color: var(--color-accent);
}

.projects-home-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.projects-home-card-body {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.projects-home-name {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.projects-home-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.skill-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 500;
  border: 1px solid;
}

.skill-tag--neutral {
  background: var(--color-tag-neutral-bg);
  border-color: var(--color-tag-neutral-border);
  color: var(--color-tag-neutral-text);
}

@media (max-width: 480px) {
  .projects-home-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Replace `src/components/home/contact/contact.tsx`** (convert to CTA teaser row)

```tsx
import "./contact.css";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <section className="contact-teaser">
      <div className="contact-teaser-inner">
        <span className="contact-teaser-text">Want to get in touch?</span>
        <Link to="/contacts" className="btn btn-primary">Contact Me</Link>
      </div>
    </section>
  );
}

export default Contact;
```

- [ ] **Step 5: Replace `src/components/home/contact/contact.css`**

```css
.contact-teaser {
  padding: 32px 24px;
  max-width: 960px;
  margin: 0 auto;
}

.contact-teaser-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
}

.contact-teaser-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.btn {
  display: inline-block;
  padding: 10px 22px;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--color-text-primary);
  color: #ffffff;
  border: 1px solid var(--color-text-primary);
}

.btn-primary:hover {
  background: #1f2937;
}

@media (max-width: 480px) {
  .contact-teaser-inner {
    flex-direction: column;
    gap: 14px;
    text-align: center;
  }
}
```

- [ ] **Step 6: Verify complete Home page**

```bash
npm run dev
```

Expected: Home page scrolls through Hero → About → Skills → Experience → Projects grid → Contact CTA. All sections visible with clean minimal style.

- [ ] **Step 7: Commit**

```bash
git add src/components/home/body.tsx \
  src/components/home/projects/projects.tsx \
  src/components/home/projects/projects.css \
  src/components/home/contact/contact.tsx \
  src/components/home/contact/contact.css
git commit -m "feat: wire Skills and Experience into Home, redesign Projects preview and Contact teaser"
```

---

## Task 9: Resume Page Redesign

**Files:**
- Modify: `src/components/resume/resume.tsx`
- Modify: `src/components/resume/resume.css`
- Modify: `src/components/resume/timeline/timeline.tsx`
- Modify: `src/components/resume/timeline/timeline.css`

- [ ] **Step 1: Replace `src/components/resume/resume.tsx`**

```tsx
import "./resume.css";
import Timeline from "./timeline/timeline";
import profilePicture from "../../assets/images/pictures/profile-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef, useState } from "react";

function Resume() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const socials = [
    { icon: faLinkedin, label: "LinkedIn", handle: "Roger Marvin", href: "https://linkedin.com/in/roger-marvin-78659b302/" },
    { icon: faGithub, label: "GitHub", handle: "RomaruDaze", href: "https://github.com/RomaruDaze" },
    { icon: faInstagram, label: "Instagram", handle: "@romaru._", href: "https://instagram.com/romaru._" },
    { icon: faXTwitter, label: "X", handle: "@RomaruDaze", href: "https://x.com/RomaruDaze" },
  ];

  return (
    <div className="resume-page">
      <div
        className={`resume-profile ${isVisible ? "rise-up" : ""}`}
        ref={ref}
        style={{ opacity: isVisible ? undefined : 0 }}
      >
        <img src={profilePicture} alt="Roger Marvin" className="resume-photo" />
        <div className="resume-info">
          <h1 className="resume-name">Roger Marvin</h1>
          <p className="resume-title">Software Engineer</p>
          <p className="resume-bio">
            22-year-old software engineer from <strong>Indonesia</strong>, studying abroad in{" "}
            <strong>Japan</strong>. Skilled in React, Flutter, and Python — passionate about
            Digital Transformation.
          </p>
          <div className="resume-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="resume-social-tag">
                <FontAwesomeIcon icon={s.icon} />
                <span>{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Timeline />
      <div className="resume-cta">
        <span>Want to connect?</span>
        <a href="mailto:romarudazee99@gmail.com" className="resume-cta-link">
          romarudazee99@gmail.com →
        </a>
      </div>
    </div>
  );
}

export default Resume;
```

- [ ] **Step 2: Replace `src/components/resume/resume.css`**

```css
.resume-page {
  max-width: 960px;
  margin: 0 auto;
  padding-top: 80px;
}

.resume-profile {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: var(--section-padding-sm);
  border-bottom: 1px solid var(--color-border-subtle);
}

.resume-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--color-border);
}

.resume-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.resume-name {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.resume-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
  margin: 0;
}

.resume-bio {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
  max-width: 520px;
}

.resume-bio strong {
  color: var(--color-text-primary);
  font-weight: 600;
}

.resume-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.resume-social-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-tag-neutral-bg);
  border: 1px solid var(--color-tag-neutral-border);
  color: var(--color-tag-neutral-text);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 500;
  transition: border-color 0.15s ease;
  cursor: pointer;
}

.resume-social-tag:hover {
  border-color: var(--color-text-primary);
  color: var(--color-text-primary);
}

.resume-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: var(--color-border-subtle);
  margin-top: 0;
}

.resume-cta span {
  font-size: 13px;
  color: var(--color-text-muted);
}

.resume-cta-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
  transition: color 0.15s ease;
  cursor: pointer;
}

.resume-cta-link:hover {
  color: var(--color-accent-hover);
}

@media (max-width: 480px) {
  .resume-profile {
    flex-direction: column;
  }
}
```

- [ ] **Step 3: Replace `src/components/resume/timeline/timeline.tsx`**

```tsx
import "./timeline.css";
import { useEffect, useRef } from "react";

interface TimelineEntry {
  date: string;
  title: string;
  subtitle: string;
  duration: string;
  detail: string;
  href?: string;
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    date: "Current",
    title: "Rakus",
    subtitle: "Software Engineer",
    duration: "Present",
    detail: "",
    isCurrent: true,
  } as any,
  {
    date: "2023",
    title: "Beenos.inc",
    subtitle: "System Engineer",
    duration: "1 year",
    detail: "AI integration into existing systems using Python and AWS.",
  },
  {
    date: "2023",
    title: "NEC",
    subtitle: "Intern",
    duration: "3 months",
    detail: "Solution development using Design Thinking methodology.",
  },
  {
    date: "2023",
    title: "Nadus Works",
    subtitle: "Intern",
    duration: "1 month",
    detail: "Office efficiency software development.",
  },
  {
    date: "April 2022",
    title: "Kaishi Professional University",
    subtitle: "Information Faculty",
    duration: "April 2022 → Present",
    detail: "Niigata, Japan",
    href: "https://kaishi-pu.ac.jp/",
  },
  {
    date: "October 2020",
    title: "Kyoshin Language Academy",
    subtitle: "Japanese Language",
    duration: "Oct 2020 → Mar 2022",
    detail: "Kyoto, Japan",
    href: "https://www.kla.ac/school/kyotochuo/",
  },
  {
    date: "July 2017",
    title: "SMA Sutomo 1 Medan",
    subtitle: "High School",
    duration: "Jul 2017 → Jun 2020",
    detail: "Medan, Indonesia",
    href: "https://sutomo-mdn.sch.id/sutomo1-sma",
  },
];

function Timeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rise-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-section">
      <span className="section-label">Career & Education</span>
      <div className="timeline">
        {TIMELINE_ENTRIES.map((entry, index) => (
          <div
            key={`${entry.title}-${index}`}
            className="tl-item"
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ opacity: 0 }}
          >
            <div className="tl-track">
              <div className={`tl-dot ${"isCurrent" in entry ? "tl-dot--current" : ""}`} />
              {index < TIMELINE_ENTRIES.length - 1 && <div className="tl-line" />}
            </div>
            <div className="tl-body">
              <div className="tl-header">
                {entry.href ? (
                  <a href={entry.href} target="_blank" rel="noopener noreferrer" className="tl-title tl-title--link">
                    {entry.title}
                  </a>
                ) : (
                  <span className="tl-title">{entry.title}</span>
                )}
                {"isCurrent" in entry && <span className="exp-badge">Current</span>}
                <span className="tl-duration">{entry.duration}</span>
              </div>
              <p className="tl-subtitle">{entry.subtitle}</p>
              {entry.detail && <p className="tl-detail">{entry.detail}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
```

- [ ] **Step 4: Replace `src/components/resume/timeline/timeline.css`**

```css
.timeline-section {
  padding: var(--section-padding-sm);
  border-bottom: 1px solid var(--color-border-subtle);
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline {
  display: flex;
  flex-direction: column;
}

.tl-item {
  display: flex;
  gap: 14px;
}

.tl-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 12px;
}

.tl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  flex-shrink: 0;
  margin-top: 4px;
}

.tl-dot--current {
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
}

.tl-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin: 4px 0;
  min-height: 16px;
}

.tl-body {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tl-item:last-child .tl-body {
  padding-bottom: 0;
}

.tl-header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.tl-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.tl-title--link {
  color: var(--color-accent);
  transition: color 0.15s ease;
  cursor: pointer;
}

.tl-title--link:hover {
  color: var(--color-accent-hover);
}

.tl-duration {
  font-size: 10px;
  color: var(--color-text-faint);
  font-weight: 500;
}

.tl-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  margin: 0;
}

.tl-detail {
  font-size: 12px;
  color: var(--color-text-faint);
  margin: 0;
  line-height: 1.5;
}

.exp-badge {
  background: var(--color-text-primary);
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.04em;
}
```

- [ ] **Step 5: Verify Resume page**

Navigate to `/#/resume` in the dev server.

Expected: Profile header with photo, name, blue subtitle, bio, social tags. Below: Career & Education timeline with dot-line entries. Bottom: "Want to connect?" CTA bar.

- [ ] **Step 6: Commit**

```bash
git add src/components/resume/resume.tsx src/components/resume/resume.css \
  src/components/resume/timeline/timeline.tsx src/components/resume/timeline/timeline.css
git commit -m "feat: redesign Resume page and Timeline with minimal dot-line style"
```

---

## Task 10: Projects Page Redesign

**Files:**
- Modify: `src/components/projects/projects.tsx`
- Modify: `src/components/projects/projects.css`

- [ ] **Step 1: Replace `src/components/projects/projects.tsx`**

```tsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./projects.css";
import { getLanguageColor } from "../../assets/colors/langcolor";
import SeleniumType from "../../assets/images/pictures/seltype-banner.png";
import TDL from "../../assets/images/pictures/tdl-banner.png";
import DokoTabe from "../../assets/images/pictures/dokotabe-banner.png";
import APReader from "../../assets/images/pictures/apreader-banner.png";
import LanguageBar from "./LanguageBar";

interface Language {
  name: string;
  percentage: number;
  color: string;
}

interface Project {
  name: string;
  repo: string;
  img: string;
  description: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    name: "SeleniumType",
    repo: "SeleniumType",
    img: SeleniumType,
    description: "Automates logging into Monkeytype and simulates typing using Selenium.",
    githubUrl: "https://github.com/RomaruDaze/SeleniumType",
  },
  {
    name: "TDL",
    repo: "TDL",
    img: TDL,
    description: "Simple and intuitive Todo List app built with Flutter.",
    githubUrl: "https://github.com/RomaruDaze/TDL",
  },
  {
    name: "DokoTabe",
    repo: "Hackathon-DokoTabe",
    img: DokoTabe,
    description: "Displays nearby restaurants on a map with filtering by distance and category.",
    githubUrl: "https://github.com/RomaruDaze/Hackathon-DokoTabe",
  },
  {
    name: "APReader",
    repo: "APReader",
    img: APReader,
    description: "Executes commands on an Access Point and logs output to a .txt file.",
    githubUrl: "https://github.com/RomaruDaze/APReader",
  },
];

function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [languages, setLanguages] = useState<Record<string, Language[]>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    PROJECTS.forEach(({ repo }) => {
      axios
        .get<Record<string, number>>(`https://api.github.com/repos/RomaruDaze/${repo}/languages`)
        .then((res) => {
          const total = Object.values(res.data).reduce((a, b) => a + b, 0);
          const langData = Object.entries(res.data).map(([name, bytes]) => ({
            name,
            percentage: (bytes / total) * 100,
            color: getLanguageColor(name),
          }));
          setLanguages((prev) => ({ ...prev, [repo]: langData }));
        })
        .catch(() => {});
    });
  }, []);

  return (
    <div className="projects-page">
      <div className={`projects-page-header ${isVisible ? "rise-up" : ""}`} style={{ opacity: isVisible ? undefined : 0 }}>
        <h1 className="projects-page-title">My Projects</h1>
        <p className="projects-page-subtitle">Things I've built</p>
      </div>
      <div className="projects-page-grid">
        {PROJECTS.map((project, index) => (
          <div
            key={project.repo}
            className={`project-card ${isVisible ? "rise-up" : ""}`}
            style={{
              opacity: isVisible ? undefined : 0,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <img src={project.img} alt={project.name} className="project-card-img" />
            <div className="project-card-body">
              <h2 className="project-card-name">{project.name}</h2>
              <p className="project-card-desc">{project.description}</p>
              <LanguageBar languages={languages[project.repo] ?? []} />
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
              >
                GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
```

- [ ] **Step 2: Replace `src/components/projects/projects.css`**

```css
.projects-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 80px 24px 48px;
}

.projects-page-header {
  margin-bottom: 32px;
}

.projects-page-title {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.projects-page-subtitle {
  font-size: 13px;
  color: var(--color-text-faint);
  margin: 0;
}

.projects-page-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.project-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color 0.2s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  border-color: var(--color-accent);
}

.project-card-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.project-card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.project-card-name {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

.project-card-desc {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

.project-card-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  transition: color 0.15s ease;
  cursor: pointer;
  align-self: flex-start;
  margin-top: auto;
}

.project-card-link:hover {
  color: var(--color-accent-hover);
}

@media (max-width: 600px) {
  .projects-page-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify Projects page**

Navigate to `/#/projects`.

Expected: Page title + 2-col flat cards with image, name, description, language bar, GitHub link. Hover adds blue border.

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/projects.tsx src/components/projects/projects.css
git commit -m "feat: redesign Projects page with flat minimal cards"
```

---

## Task 11: Contacts Page Redesign

**Files:**
- Modify: `src/components/contacts/contacts.tsx`
- Modify: `src/components/contacts/contacts.css`

- [ ] **Step 1: Replace `src/components/contacts/contacts.tsx`**

```tsx
import "./contacts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import emailjs from "emailjs-com";
import { useEffect, useRef, useState } from "react";

const SOCIAL_LINKS = [
  { icon: faEnvelope, label: "Email", handle: "romarudazee99@gmail.com", href: "mailto:romarudazee99@gmail.com" },
  { icon: faLinkedin, label: "LinkedIn", handle: "Roger Marvin", href: "https://linkedin.com/in/roger-marvin-78659b302/" },
  { icon: faGithub, label: "GitHub", handle: "RomaruDaze", href: "https://github.com/RomaruDaze" },
  { icon: faInstagram, label: "Instagram", handle: "@romaru._", href: "https://instagram.com/romaru._" },
  { icon: faXTwitter, label: "X / Twitter", handle: "@RomaruDaze", href: "https://x.com/RomaruDaze" },
];

function Contacts() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const templateParams = {
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      message: messageRef.current?.value ?? "",
    };
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => alert("Message sent!"))
      .catch(() => alert("Failed to send. Please try again."));
  };

  return (
    <div className="contacts-page" ref={ref}>
      <div className={`contacts-header ${isVisible ? "rise-up" : ""}`} style={{ opacity: isVisible ? undefined : 0 }}>
        <h1 className="contacts-title">Get in Touch</h1>
        <p className="contacts-subtitle">Open to opportunities and collaborations.</p>
      </div>

      <div className={`contacts-body ${isVisible ? "rise-up" : ""}`} style={{ opacity: isVisible ? undefined : 0, animationDelay: "0.15s" }}>
        <div className="contacts-links">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <div className="contact-link-icon" aria-hidden="true">
                <FontAwesomeIcon icon={s.icon} />
              </div>
              <div className="contact-link-info">
                <span className="contact-link-label">{s.label}</span>
                <span className="contact-link-handle">{s.handle}</span>
              </div>
              <span className="contact-link-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="contacts-form-card">
          <span className="section-label">Send a Message</span>
          <form onSubmit={handleSubmit} className="contacts-form">
            <label htmlFor="contact-name" className="form-label">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              ref={nameRef}
              required
              className="form-input"
            />
            <label htmlFor="contact-email" className="form-label">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              ref={emailRef}
              required
              className="form-input"
            />
            <label htmlFor="contact-message" className="form-label">Message</label>
            <textarea
              id="contact-message"
              placeholder="What's on your mind?"
              rows={5}
              ref={messageRef}
              required
              className="form-textarea"
            />
            <button type="submit" className="btn btn-primary form-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
```

- [ ] **Step 2: Replace `src/components/contacts/contacts.css`**

```css
.contacts-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 80px 24px 48px;
}

.contacts-header {
  text-align: center;
  margin-bottom: 40px;
}

.contacts-title {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.contacts-subtitle {
  font-size: 13px;
  color: var(--color-text-faint);
  margin: 0;
}

.contacts-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contacts-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-link-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.15s ease;
  text-decoration: none;
}

.contact-link-card:hover {
  border-color: var(--color-accent);
}

.contact-link-icon {
  width: 36px;
  height: 36px;
  background: var(--color-border-subtle);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: var(--color-text-primary);
  flex-shrink: 0;
}

.contact-link-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
}

.contact-link-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-faint);
}

.contact-link-handle {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.contact-link-arrow {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent);
}

.contacts-form-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 8px;
}

.contacts-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 2px;
}

.form-input,
.form-textarea {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--color-text-primary);
  background: var(--color-bg);
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--color-accent);
}

.form-textarea {
  resize: vertical;
}

.form-submit {
  align-self: flex-end;
}

.btn {
  display: inline-block;
  padding: 10px 22px;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
  border: none;
}

.btn-primary {
  background: var(--color-text-primary);
  color: #ffffff;
}

.btn-primary:hover {
  background: #1f2937;
}
```

- [ ] **Step 3: Verify Contacts page**

Navigate to `/#/contacts`.

Expected: "Get in Touch" heading, 5 social link cards (Email, LinkedIn, GitHub, Instagram, X), contact form with labeled fields and Send button.

- [ ] **Step 4: Commit**

```bash
git add src/components/contacts/contacts.tsx src/components/contacts/contacts.css
git commit -m "feat: redesign Contacts page with social link cards and minimal form"
```

---

## Task 12: Final Polish — Remove Old CSS and Clean Up

**Files:**
- Modify: `src/assets/fonts/font-roboto.css` (check for conflicts)
- Modify: `src/assets/fonts/font-tektur.css` (no longer needed)
- Modify: `src/App.tsx` (remove font-roboto import if redundant)

- [ ] **Step 1: Check `src/assets/fonts/font-roboto.css` contents**

```bash
cat src/assets/fonts/font-roboto.css
cat src/assets/fonts/font-tektur.css
```

These files likely import Google Fonts. Since we're now loading Archivo and Space Grotesk via `index.css`, we can remove both font file imports from `App.tsx`.

- [ ] **Step 2: Remove font imports from `src/App.tsx`**

Remove the line:
```tsx
import "./assets/fonts/font-roboto.css";
```

Final `App.tsx` imports section should be:
```tsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Body from "./components/home/body";
import Resume from "./components/resume/resume";
import Projects from "./components/projects/projects";
import Contacts from "./components/contacts/contacts";
import Footer from "./components/footer/footer";
```

- [ ] **Step 3: Run full site check**

```bash
npm run dev
```

Visit all four routes and verify:
- `/#/` — Hero, About, Skills, Experience, Projects preview, Contact CTA
- `/#/resume` — Profile header, timeline, CTA bar
- `/#/projects` — 2-col flat card grid with language bars
- `/#/contacts` — Social cards, contact form

Check that:
- No console errors
- All fonts load (Archivo for headings, Space Grotesk for body)
- All sections animate in on scroll
- Hover states work on cards and links
- Header shows "RomaruDaze" logo and active nav link is bold

- [ ] **Step 4: Run TypeScript build check**

```bash
npm run build
```

Expected: Build completes with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "chore: remove unused font imports after redesign"
```

---

## Task 13: Add `.superpowers` to `.gitignore`

**Files:**
- Modify: `.gitignore` (or create if missing)

- [ ] **Step 1: Add entry**

```bash
echo ".superpowers/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm directory"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Design token system (`tokens.css`) — Task 1
- [x] Google Fonts (Archivo + Space Grotesk) — Task 1
- [x] Header redesign (logo, active nav, minimal) — Task 2
- [x] Footer redesign (single row) — Task 3
- [x] Hero section (badge, name, tagline, 2 CTAs) — Task 4
- [x] About section (horizontal layout) — Task 5
- [x] Skills component (5 tag groups, color-coded) — Task 6
- [x] Experience component (dot-line timeline, 4 entries) — Task 7
- [x] Home Body wiring + Projects preview + Contact teaser — Task 8
- [x] Resume page (profile header, social tags, CTA bar) — Task 9
- [x] Timeline refactored (work + education, minimal style) — Task 9
- [x] Projects page (flat cards, no flip, language bar kept) — Task 10
- [x] Contacts page (social link cards + labeled form) — Task 11
- [x] `.superpowers` gitignore — Task 13
- [x] `prefers-reduced-motion` — included in `index.css` Task 1
- [x] All cards: `cursor: pointer` via `cursor: pointer` on anchor/button elements
- [x] Hover states: `border-color` transition 200ms
- [x] Accessibility: form labels with `htmlFor`, `alt` text on all images, `aria-label` on footer icons
