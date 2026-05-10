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
