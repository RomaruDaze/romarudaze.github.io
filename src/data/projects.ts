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

// Adding a new project is just adding another object to this array;
// no component changes needed.
export const projects: Project[] = [
  {
    id: "livetem",
    title: "Livetem",
    description:
      "A VS Code extension for saving, organizing, and inserting code snippets without leaving the editor. Published on the VS Code Marketplace.",
    tags: ["React", "TypeScript", "VS Code Extension"],
    links: {
      live: "https://marketplace.visualstudio.com/items?itemName=RomaruDaze.livetem",
      repo: "https://github.com/RomaruDaze/livetem",
    },
  },
  {
    id: "demo-ecsites",
    title: "Demo E-Commerce Site",
    description:
      "A demo e-commerce web application built to practice server-rendered architecture with Spring Boot and Thymeleaf templates.",
    tags: ["Spring Boot", "Thymeleaf", "Java"],
    links: {
      repo: "https://github.com/RomaruDaze/demo-ecsites",
    },
  },
  {
    id: "bloomdays",
    title: "BloomDays",
    description:
      "A privacy-focused menstrual cycle tracker with calendar visualization and predictions, built with Next.js and Firebase.",
    tags: ["Next.js", "TypeScript", "Firebase"],
    links: {
      live: "https://bloomdays.vercel.app",
      repo: "https://github.com/RomaruDaze/bloomdays",
    },
  },
  {
    id: "explog",
    title: "Explog",
    description:
      "A minimalist, mobile-first expense logger that submits entries to a Google Sheet through a Google Apps Script web app.",
    tags: ["React", "Vite", "Google Apps Script"],
    links: {
      live: "https://explog-ten.vercel.app",
      repo: "https://github.com/RomaruDaze/explog",
    },
  },
  {
    id: "quoteday",
    title: "QuoteDay",
    description:
      "An Android app that delivers a fresh daily quote for a small moment of inspiration.",
    tags: ["Kotlin", "Android"],
    links: {
      repo: "https://github.com/RomaruDaze/quoteday",
    },
  },
  {
    id: "deadly-death-deadliest",
    title: "Deadly Death Deadliest",
    description:
      "A browser-based action RPG built with GDevelop, backed by a FastAPI server.",
    tags: ["GDevelop", "FastAPI", "JavaScript"],
    links: {
      repo: "https://github.com/RomaruDaze/deadly-death-deadliest",
    },
  },
  {
    id: "image-hosting",
    title: "Image Hosting",
    description:
      "A lightweight image hosting service that returns short shareable URLs, built with Node.js/Express and Supabase Storage.",
    tags: ["Node.js", "Express", "Supabase"],
    links: {
      repo: "https://github.com/RomaruDaze/image-hosting",
    },
  },
  {
    id: "fun-ui",
    title: "Fun UI",
    description:
      "A collection of small, playful UI experiments — buttons, keyboards, and other interactive bits — built with vanilla HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: {
      repo: "https://github.com/RomaruDaze/fun-ui",
    },
  },
];
