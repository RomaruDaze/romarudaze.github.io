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
];
