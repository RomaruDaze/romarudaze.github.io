import { socialLinks } from "../../data/social";
import { GitHubIcon, LinkedInIcon, InstagramIcon, EmailIcon } from "../icons/icons";
import "./header.css";

const navItems = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
];

const iconComponents = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  email: EmailIcon,
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header() {
  return (
    <header className="header">
      <div className="header__bar">
        <span className="header__prompt">roger@portfolio:~$</span>
        <nav className="header__nav" aria-label="Section navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="header__nav-link"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header__social" aria-label="Social links">
          {socialLinks.map((link) => {
            const Icon = iconComponents[link.icon];
            const isExternal = link.icon !== "email";
            return (
              <a
                key={link.id}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                aria-label={link.label}
                className="header__social-link"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
