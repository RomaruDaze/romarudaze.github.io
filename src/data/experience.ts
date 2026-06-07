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
