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
