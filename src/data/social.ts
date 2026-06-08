export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "instagram" | "email";
}

export const socialLinks: SocialLink[] = [
  { id: "email", label: "Email", href: "mailto:romarudazee99@gmail.com", icon: "email" },
  { id: "github", label: "GitHub", href: "https://github.com/RomaruDaze", icon: "github" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/roger-marvin-78659b302/", icon: "linkedin" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/rogermarvin_", icon: "instagram" },
];
