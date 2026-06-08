export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}

// Most recent first.
export const experience: ExperienceEntry[] = [
  {
    id: "rakus",
    role: "Software Engineer",
    organization: "RAKUS Co., Ltd.",
    period: "2026 — Present",
    description:
      "Working as a software engineer building and maintaining web applications.",
  },
  {
    id: "beenos",
    role: "Software Engineer",
    organization: "BEENOS",
    period: "2025 — 2026",
    description:
      "Worked as a software engineer contributing to web application development.",
  },
  {
    id: "kaishi-pu",
    role: "Undergraduate, Information Technology",
    organization: "Kaishi Professional University",
    period: "2022 — 2026",
    description:
      "Studied information technology with a focus on software development.",
  },
];
