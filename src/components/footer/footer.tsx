import { socialLinks } from "../../data/social";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "../icons/icons";
import "./footer.css";

const iconComponents = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
};

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__line">
        <span className="section__heading-prompt">$</span> echo "thanks for stopping by"
      </p>
      <div className="footer__social" aria-label="Social links">
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
              className="footer__social-link"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
