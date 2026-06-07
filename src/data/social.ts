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
